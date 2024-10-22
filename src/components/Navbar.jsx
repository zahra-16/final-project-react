import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Input,
  Button,
  Divider,
  Kbd,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";

import { Heart, Search, Star } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "./context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { toogleTheme } from "../store/action/ThemeAction";
import SearchCard from "./SearchCard";
import axios from "axios";

export default function NavbarComp() {
  const [getTheme, setTheme] = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const theme = useSelector((state) => state.theme.theme);
  const root = window.document.documentElement;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatchRedux = useDispatch();
  // const navigate = useNavigate();

  const fetchSearch = useCallback(
    async (query) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?query=${query}&api_key=9e6e84a1920044396f1c45215c787688`
        );
        setData(response.data.results);
      } catch (error) {
        console.error("Error fetching trending data:", error.message);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    fetchSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark"; // Default to dark
    setTheme(savedTheme);
    root.classList.add(savedTheme);
  }, [setTheme, root]);

  useEffect(() => {
    localStorage.setItem("theme", getTheme);
    if (getTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [getTheme, root]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleTheme = () => {
    setTheme(getTheme === "dark" ? "light" : "dark");
  };

  return (
    <Navbar
      isBordered
      className="bg-white text-black dark:bg-black dark:text-white"
    >
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link to="/">
            <div className="">--Movie</div>
          </Link>
          <Link to="/">
            <p className="hidden sm:block font-bold text-inherit">Site--</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3 ">
          <NavbarItem>
            <Link to="/">Home</Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/film">Movie</Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/Category">Category</Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center pr-72" justify="end">
        <form action="#">
          <Button className="w-full p-0" onPress={onOpen}>
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<Search />}
              type="search"
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              <>
                <form action={`/search?q=${searchQuery}`}>
                  <Input
                    name="q"
                    placeholder="Cari film..."
                    startContent={<Search className="text-white" />}
                    endContent={<Kbd>ESC</Kbd>}
                    radius="none"
                    size="lg"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Divider />
                  <ModalBody className="text-white overflow-y-scroll">
                    <div className="h-[400px]">
                      <div className="flex space-y-3 py-3 flex-col">
                        {data.map((item, index) => {
                          return (
                            <SearchCard
                              type={item.media_type}
                              key={index}
                              img={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                              title={item.title}
                              overview={item.overview}
                              id={item.id}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </ModalBody>
                </form>
              </>
            </ModalContent>
          </Modal>
        </form>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Dropdown placement="bottom-end" className="dark:bg-black">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="User"
              size="sm"
              src="https://i.pinimg.com/564x/4a/b1/2a/4ab12ae9e73fd59c1ca67b892f90c558.jpg"
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            className="bg-white text-black dark:bg-black dark:text-white"
          >
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">User@example.com</p>
            </DropdownItem>
            <DropdownItem
              key="analytics"
              className="flex items-center justify-start space-x-2"
            >
              <Link to="/rated-movies" className="flex items-center space-x-2">
                <Star />
                <span>Rating</span>
              </Link>
            </DropdownItem>
            <DropdownItem
              key="favorite"
              className="flex items-center space-x-2"
            >
              <Link to="/favorite" className="flex items-center space-x-2">
                <Heart />
                <span>Favorite</span>
              </Link>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavbarContent>
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              onClick={() => dispatchRedux(toogleTheme())}
              onChange={handleTheme}
              checked={getTheme === "light"}
            />
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
}
