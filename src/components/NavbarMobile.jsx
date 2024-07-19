import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LucideLogIn, LucideLogOut, LucideMenu } from "lucide-react";

const NavbarMobile = ({ open, setOpen, user }) => {
  return (
    <>
      <a>
        <LucideMenu onClick={() => setOpen(true)} />
      </a>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="mt-5 flex flex-col gap-5 text-gray-900 leading-6 font-semibold">
            <a href="/">Hjem</a>
            {user && (
              <>
                <a href="/min-side">Min side</a>
                <a href="/mine-forsok">Mine forsøk</a>
              </>
            )}
            <a href="/tips">Tips</a>
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
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NavbarMobile;
