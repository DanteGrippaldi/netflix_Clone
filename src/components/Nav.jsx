import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { setUser } from "../features/userSlice";
import { signOut } from "firebase/auth";
import "./Nav.css";

const Nav = () => {
  const [handleShow, setHandleShow] = useState(false);
  const dispatch = useDispatch();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setHandleShow(true);
    } else {
      setHandleShow(false);
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => toast.success("Logged out"))
      .catch((err) => console.log(err));

    dispatch(setUser({ email: "", password: "" }));
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`nav ${handleShow && "nav__black"}`}>
      <div className="nav__content">
        <img
          className="nav__logo"
          alt="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        />

        <img
          onClick={handleSignOut}
          className="nav__avatar"
          alt="avatar"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAACFCAMAAABCBMsOAAAAYFBMVEUNfoD///8Ae30AdngAcnQAeXz6/f2sycl6rq/2+fnu9fXS5eUAdHfJ3N3E2tvh7e3a5eWTvr8kiIq81dY2jpCx0dJloaNCj5GMuLkmgIKFtbWgxsdPlpg1iIm0zs9anZ5Da/zEAAACRUlEQVR4nO2ZbbObIBCFdQFfMErQqFVJ/P//8mq8zZXc2mCk007nPONXDsdl3WHXIAAAAAAAAAAAAAAAwBOCc8FP5FOPpmfXGgqSIk1l3ZAfH2/pUXsOF6rOhw1qs0UuqgJnPWpl+JOMeTBRpg+93H2VCr+oPdg4r/Sqk9sakYRryqNnYutFrZueqCwXP44Gg+eWnhZOqzpprSoOH4l6R69L7VVu3rcpbRe5Y2K85X0bYetVbnpPedEfzounPHOLLY1WTrvXGSe91PWbY+ukHo6mxWRjHYzBNbRUfpWZwjGXfqu3yrTKPbIU1NESPu2hcq705C49IqPzc9471jknvWzW23m8dOKcM3/3C2KTnvCnBwAAAADwL0GMebw5zYL71UhchyK++LzAleXOtyLWDXMHLA8PAR6K5dSyZGbH3It4Oyz38PDm5V4/axb3tq02bvdZYkFTRI92+Xiftaiaz7Y+qkZ6ZYSEuAzrhtlXLMg8XixUg2GnrVQlwdnUiVjdsr+8CCxhOTRtIJgVFJo+SupMUtsjmTCt/JkgY88kQnmudNNeu3n7KTBd1459XCh7HjN5uBmf9YKEft7hbkZlM+rb9ouH+OJxmnyHBVr9aqstoqwXfuvmHWLXPoteb3+3oG5j4OkD/YbgYyxfe5B1I/if8jAzteIXnW87iVShS5//FjaNCLqOfaVkuj6eKJLqHCeme1nVPDphnJWmSXodz2idNGMb8NNfGFjQVKvZJ4I8/VkBAAAAAAAAAAAAAAAAAAD4D/kAFVAV4ZNgT6IAAAAASUVORK5CYII="
        />
      </div>
    </div>
  );
};

export default Nav;
