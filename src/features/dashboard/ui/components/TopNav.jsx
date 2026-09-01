import { Bell, Lightbulb, Menu, Moon, Search } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../../shared/state/themeSlice";

const TopNav = () => {
  const dispatch = useDispatch();
  // const theme = useSelector((state) => state.theme.mode); // Another way
  const {mode} = useSelector(store => store.theme)

  useEffect(() => {
    document.documentElement.classList.toggle("light", mode === "light");
  }, [mode]);

  

  const changeTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="flex justify-between bg-[--bg-card] items-center">
      <div className="flex gap-4 items-center w-[30%] rounded px-3 py-2 bg-(--bg-surface) border border-gray-600">
        <Search size={23} />
        <input
          className="outline-0 w-full text-(--text-primary)"
          type="text"
          placeholder="Search workspace.."
        />
      </div>
      <div className="flex gap-4">
        {
          mode === "light" ? <Lightbulb onClick={changeTheme} /> : <Moon onClick={changeTheme} />
        }

        <Bell size={23} />
        <Menu size={23} />
      </div>
    </div>
  );
};

export default TopNav;
