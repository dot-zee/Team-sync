# Team-sync

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.12-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Axios](https://img.shields.io/badge/Axios-1.19-5A29E4)](https://axios-http.com/)

Team-sync is a React single-page application for collaborative workspace management. The frontend communicates with the Team-sync backend through Axios, uses Redux Toolkit for shared state, and uses React Router for public and authenticated application flows.

## Contents

1. [Project Architecture](#project-architecture)
2. [Routing Setup](#routing-setup)
3. [API Configuration](#api-configuration)
4. [Authentication and State Management](#authentication-and-state-management)
5. [Protected Routes](#protected-routes)
6. [Role-Based Routing](#role-based-routing)
7. [User Hydration](#user-hydration)
8. [Theme Toggle System](#theme-toggle-system)
9. [Axios Interceptors and Session Renewal](#axios-interceptors-and-session-renewal)
10. [Local Development](#local-development)

## Project Architecture

The application follows a four-layered feature-oriented architecture:

- **UI / Presentation:** Pages, layouts, and reusable dashboard components render the experience and collect user input.
- **State / Redux:** Slices describe shared state and async thunks coordinate authentication state transitions.
- **Services / API:** The shared Axios instance is the single HTTP boundary for backend requests.
- **Configuration:** Store, routing, global styles, and build configuration compose the application.

```text
.
├── public/images/                         # Static page assets
├── src/
│   ├── main.jsx                           # React entry point and Redux Provider
│   ├── index.css                          # Tailwind import and theme variables
│   ├── app/
│   │   ├── store.js                        # Redux Toolkit store
│   │   └── layout/
│   │       ├── AuthLayout.jsx              # Public route outlet
│   │       └── DashboardLayout.jsx         # Authenticated shell and navigation
│   ├── config/
│   │   └── axiosInstance.jsx               # API client and response interceptor
│   ├── features/
│   │   ├── auth/
│   │   │   ├── api/                        # Auth API boundary (reserved for expansion)
│   │   │   ├── hooks/useAuth.jsx           # Form and auth event orchestration
│   │   │   ├── state/
│   │   │   │   ├── authSlice.jsx            # Employee session state
│   │   │   │   └── LoginAction.jsx          # Login and current-user thunks
│   │   │   └── ui/pages/                    # Login and registration screens
│   │   ├── dashboard/                       # Home page and dashboard components
│   │   ├── departments/                     # Department feature boundary
│   │   └── employees/                       # Employee feature boundary
│   ├── routes/
│   │   ├── AppRoutes.jsx                    # Route tree and startup hydration
│   │   └── protectedRoutes/                 # Public and authenticated guards
│   └── shared/state/themeSlice.jsx          # Cross-feature theme state
├── index.html
├── package.json
└── vite.config.js
```

Feature code stays close to the user workflow it serves. App-wide concerns such as layouts, routing, the store, and theme state remain in `app`, `routes`, and `shared`.

## Routing Setup

`src/routes/AppRoutes.jsx` creates a browser router and renders it through `RouterProvider`. Routes are grouped by access level:

- `/` is public and renders `AuthLayout`.
- `/register` is nested under the public route.
- `/home` is protected and renders `DashboardLayout`, which provides `AsideNav`, `TopNav`, and an outlet for dashboard pages.

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        path: "",
        element: <AuthLayout />,
        children: [
          { path: "", element: <LoginInPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },
    ],
  },
  {
    path: "/home",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [{ path: "", element: <Home /> }],
      },
    ],
  },
]);
```

Layouts use React Router's `<Outlet />` so the parent shell stays mounted while the matching child page is rendered.

## API Configuration

The API boundary lives in `src/config/axiosInstance.jsx`. Every feature can import the same configured client instead of repeating connection settings.

```jsx
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://team-sync-backend-n78w.onrender.com/api",
  withCredentials: true,
});
```

`baseURL` points to the deployed backend API. `withCredentials: true` allows browser-managed credentials, including the HTTP-only cookie used by the refresh flow, to be sent with requests.

## Authentication and State Management

The application is mounted inside Redux's `Provider` in `src/main.jsx`:

```jsx
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppRoutes />
    <ToastContainer />
  </Provider>,
);
```

### Store

`src/app/store.js` registers the `auth` and `theme` reducers. `configureStore` includes Redux Toolkit's default middleware, which includes `redux-thunk` support.

```js
export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
});
```

### Auth slice

The auth slice stores the current `employee` and an `isLoading` flag. An employee is restored optimistically from local storage when the Redux store is created:

```js
const loggedInEmployee = localStorage.getItem("employee");
const parsedEmployee = loggedInEmployee ? JSON.parse(loggedInEmployee) : null;

const initialState = {
  employee: parsedEmployee,
  isLoading: false,
};
```

`loginAction` and `currentEmployee` update the slice through pending, fulfilled, and rejected cases. `removeEmployee` clears both Redux state and the local storage entry.

### Login thunk

The login form is managed by `useAuth` and submits credentials to the login endpoint:

```js
export const loginAction = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("auth/login", credentials);
      toast.success("Logged in successfully");
      localStorage.setItem("employee", JSON.stringify(res.data.data));
      return res.data.data;
    } catch (error) {
      toast.error("Login Failed");
      return rejectWithValue(error);
    }
  },
);
```

The current registration page and form validation are present, but `onRegister` in `useAuth` currently logs the submitted data only. A registration API thunk can be added alongside `loginAction` when the backend contract is finalized.

## Protected Routes

`ProtectedRoute` is a wrapper around authenticated route branches. It reads `auth.employee` from Redux and controls access before rendering the nested outlet:

```jsx
const ProtectedRoute = () => {
  const { employee, isLoading } = useSelector((store) => store.auth);

  if (isLoading) return <h1>Loading...</h1>;
  if (!employee) return <Navigate to="/" />;

  return <Outlet />;
};
```

This keeps authorization logic out of individual pages. `PublicRoute` applies the inverse rule: an already authenticated employee is redirected from public pages to `/home`.

## Role-Based Routing

Role-based routing builds on the authenticated `employee` already stored in Redux. The current implementation recognizes two role values: `admin` and `employee`.

### 1. Make the role available

`loginAction` stores the employee returned by `auth/login` in local storage and returns it to the `auth` slice. On a later page load, `currentEmployee` calls `auth/me` and hydrates the same Redux state. In both cases, the role is read from `employee.role`.

```js
// src/features/auth/state/authSlice.jsx
initialState: {
	employee: parsedEmployee,
	isLoading: false,
}
```

The role is therefore available to both route guards and dashboard navigation through `state.auth.employee`.

### 2. Check the employee role

`src/routes/protectedRoutes/RoleBasedRoutes.jsx` receives an `allowedRole` prop and compares it with the current employee's role:

```jsx
export const RoleBasedRoutes = ({ allowedRole }) => {
  const { employee } = useSelector((store) => store.auth);

  if (!allowedRole.includes(employee?.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};
```

The optional chaining prevents a role access error while the employee value is unavailable. Authentication itself is handled one level above by `ProtectedRoute`; this component handles authorization after the route has passed the authentication check.

### 3. Group routes by role

The route definitions are separated into `src/routes/adminRoutes.jsx`, `src/routes/employeeRoutes.jsx`, and `src/routes/commonRoutes.jsx`:

- `commonRoutes` is available to every authenticated employee: `/home`, `/home/chats`, and `/home/settings`.
- `adminRoutes` contains `/home/department`, `/home/documents`, `/home/employees-management`, and `/home/tasks`.
- `employeeRoutes` contains `/home/attendance`, `/home/my-task`, and `/home/profile`.

`AppRoutes.jsx` nests the role-specific arrays under the authenticated dashboard layout:

```jsx
{
	element: <RoleBasedRoutes allowedRole="admin" />,
	children: adminRoutes,
},
{
	element: <RoleBasedRoutes allowedRole="employee" />,
	children: employeeRoutes,
},
```

Because each guard renders an `<Outlet />` only for the matching role, the child pages are rendered only after authorization succeeds. Unmatched role checks navigate to `/unauthorized`. The current route configuration does not define an `/unauthorized` page, so that destination should be added if a dedicated unauthorized screen is required.

### 4. Match dashboard navigation to the role

Role-based access is also reflected in `src/app/constants/navigations.jsx`. `AsideNav.jsx` selects one navigation list from `state.auth.employee.role`:

```jsx
const navigations =
  employee?.role === "admin" ? adminNavigations : employeeNavigations;

return navigations.map((value) => (
  <NavigationTab title={value.title} path={value.path} icon={value.icon} />
));
```

This controls which links appear in the dashboard sidebar. It complements, but does not replace, `RoleBasedRoutes`: the route guard remains the enforcement point when a user manually enters a URL.

### Complete request flow

1. The user submits the login form and `loginAction` requests `auth/login`.
2. The returned employee is placed in `state.auth.employee`, including its lowercase `role` value, and cached in local storage.
3. On application load, `currentEmployee` calls `auth/me` to restore the server-backed session when available.
4. `ProtectedRoute` checks that an employee exists before rendering the `/home` dashboard branch.
5. `AppRoutes` sends common pages to all authenticated users and wraps admin or employee pages with `RoleBasedRoutes`.
6. `RoleBasedRoutes` compares `employee.role` to `allowedRole`; matching users see the page, while non-matching users are redirected to `/unauthorized`.
7. `AsideNav` selects the matching navigation list so the sidebar presents the links for that role.

## User Hydration

On application startup, `AppRoutes` dispatches `currentEmployee()` in a `useEffect`:

```jsx
useEffect(() => {
  dispatch(currentEmployee());
}, []);
```

The thunk calls `auth/me` and places the returned user in Redux. While that request is pending, `ProtectedRoute` displays a loading state; when it resolves, the route either renders the dashboard or redirects to login. This verifies the server session instead of relying only on stale local storage.

```js
export const currentEmployee = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("auth/me");
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
```

## Theme Toggle System

Theme state is kept in `src/shared/state/themeSlice.jsx` so it can be consumed by dashboard components:

```js
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: localStorage.getItem("theme") || "dark",
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem("theme", state.mode);
    },
  },
});
```

`TopNav` dispatches `toggleTheme` and synchronizes the Redux value with the document root:

```jsx
const theme = useSelector((state) => state.theme.mode);

useEffect(() => {
  document.documentElement.classList.toggle("light", theme === "light");
}, [theme]);
```

`src/index.css` defines dark-theme variables on `:root` and overrides them under `.light`. Components can then use variables such as `var(--bg-main)`, `var(--bg-card)`, and `var(--text-primary)`. The selected mode persists across reloads through `localStorage`.

## Axios Interceptors and Session Renewal

The response interceptor in `src/config/axiosInstance.jsx` is a recovery layer for expired access tokens:

```js
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;

    if (error.response.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      try {
        await axiosInstance.get("/auth/get-accessToken");
        return axiosInstance(originalReq);
      } catch (refreshError) {
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }
  },
);
```

The sequence is:

1. Successful responses pass through unchanged.
2. A `401` response captures the failed request configuration.
3. `_retry` prevents an infinite retry loop.
4. The client requests a fresh access token through `/auth/get-accessToken`.
5. On success, the original request is replayed.
6. If refresh fails, the browser returns to `/` so the user can authenticate again.

The refresh request relies on credentials being included by Axios. When extending this interceptor, retain the retry guard and ensure non-`401` errors are rejected so callers receive the original failure.

## Local Development

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Useful project scripts:

```bash
npm run build    # Create a production build
npm run lint     # Run ESLint
npm run preview  # Preview the production build locally
```

The application expects the backend API at `https://team-sync-backend-n78w.onrender.com/api`.
