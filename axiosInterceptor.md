## An automatic token refresh mechanism. It acts as a safety net for expired user sessions.

---

## Step-by-Step Breakdown

Because this interceptor runs on *every single response* your app receives, the order of operations matters.

1. **Pass successes through:** (response) =.
response">
If the API call succeeds (status `2xx`), the interceptor does nothing. It just passes the successful data back to whatever component originally asked for it.


2. **Catch failures and save context:** const originalReq = error.config;.
If a request fails, execution jumps to the second function. Before doing anything else, the code saves the exact settings of the failed request (the URL, the payload, the headers) into `originalReq`. We will need this to try the request again later.


3. **Identify expired tokens:** if (error.response.status === 401 && !originalReq._retry).
It checks two things before acting:

1. Did it fail because the token is expired/invalid? (`status === 401`)
2. Is this the *first* time this request has failed? (`!originalReq._retry`)


4. **Prevent infinite loops:** originalReq._retry = true;.
It tags the request configuration to indicate, "I am attempting to retry this." If the background token refresh *also* fails with a 401, this flag ensures the interceptor doesn't get stuck in an endless loop of trying and failing to refresh.


5. **Silently fetch a new token:** await axiosInstance.get('/auth/get-accessToken').
It makes an emergency background call to your server's refresh endpoint. Because this is an interceptor, the rest of your app's code is "paused" waiting for the original request to finish. *(Note: This setup usually relies on secure HTTP-only cookies being automatically sent with this request to prove who the user is).*


6. **Replay the original request:** return axiosInstance(originalReq).
If step 5 succeeds, the browser now has a fresh session. The code takes that saved configuration from Step 2 and fires it off again. To the component that made the original API call, it looks like a single successful request that just took a little longer than usual.


7. **Fallback to Login:** window.location.href = '/'.
If the refresh call in Step 5 fails (meaning the user's login has *completely* expired), it kicks them back to the home/login page and rejects the promise so your app knows the sequence ultimately failed.