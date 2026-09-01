import { useEmployees } from "../../hooks/useEmployees";

const EmployeesTable = () => {
  const { data, isPending } = useEmployees();

  if (isPending) return <h1>Fetching , Please wait ...</h1>;

  return (
    <div className="min-h-scree p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Employees</h1>

            <p className="mt-1 text-sm">
              Manage and view all employees in your organization.
            </p>
          </div>

          <div className="rounded-lg border  px-4 py-2.5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Total Employees
            </p>

            <p className="mt-0.5 text-xl font-semibold">206</p>
          </div>
        </div>

        {/* Table Card */}
        <div className="overflow-hidden rounded-xl border  shadow-sm">
          {/* Table Header */}
          <div className="border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold ">Employee Directory</h2>

                <p className="mt-0.5 text-sm ">
                  A list of employees currently in the system.
                </p>
              </div>

              <span className="rounded-full  px-3 py-1 text-xs font-medium ">
                Page 1 of 11
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-slate-200 ">
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider ">
                    Employee
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider ">
                    Role
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider ">
                    Department
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider ">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {data.employees.map((employee) => (
                  <tr key={employee.id} className="transition-colors">
                    {/* Employee */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full  text-sm font-semibold ">
                          {employee.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </div>

                        <div>
                          <p className="text-sm font-medium">{employee.name}</p>

                          <p className="mt-0.5 text-xs">{employee.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className="text-sm">{employee.role}</span>
                    </td>

                    {/* Department */}
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-md  px-2.5 py-1 text-xs font-medium ">
                        {employee.department}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {employee.status === "Active" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                          Inactive
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex flex-col gap-4 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-700">1</span> to{" "}
              <span className="font-medium text-slate-700">20</span> of{" "}
              <span className="font-medium text-slate-700">206</span> employees
            </p>

            <div className="flex items-center gap-1">
              <button className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button className="flex h-9 min-w-9 items-center justify-center rounded-md  px-3 text-sm font-medium">
                2
              </button>

              <button className="flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm">
                3
              </button>

              <span className="flex h-9 items-center px-2 text-sm ">...</span>

              <button className="flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm text-slate-600">
                11
              </button>

              <button className="flex h-9 w-9 items-center justify-center rounded-md border ">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesTable;
