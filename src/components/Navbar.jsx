import { AuthContext } from "@/context/AuthProvider";
import { useMediaQuery } from "@uidotdev/usehooks";
import { LucideLogIn, LucideLogOut } from "lucide-react";
import { useContext, useState } from "react";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { user, token } = useContext(AuthContext);

  return (
    <div className="p-3">
      <header>
        <nav className="flex justify-between items-center max-w-[90%] mx-auto text-sm text-gray-900 leading-6 font-semibold">
          <div>
            <a href="/">
              <span className="sr-only">Quiz App</span>
              <img
                className="h-8 lg:h-16 w-auto"
                src="/images/quiz-logo.png"
                alt="Quiz logo"
              />
            </a>
          </div>
          {isDesktop && (
            <>
              <div className="flex gap-10">
                <a href="/">Hjem</a>
                {user && token && (
                  <>
                    <a href="/min-side">Min side</a>
                    <a href="/mine-forsok">Mine forsøk</a>
                  </>
                )}
                <a href="/tips">Tips</a>
              </div>
              <div className="flex">
                {user === null ? (
                  <a className="flex gap-2 items-center" href="/logg-inn">
                    <LucideLogIn /> Logg inn
                  </a>
                ) : (
                  <a className="flex gap-2 items-center" href="/logg-ut">
                    <LucideLogOut /> Logg ut
                  </a>
                )}
              </div>
            </>
          )}
          {!isDesktop && (
            <NavbarMobile
              open={mobileMenuOpen}
              setOpen={setMobileMenuOpen}
              user={user}
            />
          )}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
