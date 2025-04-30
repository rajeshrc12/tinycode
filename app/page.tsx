import SignIn from "@/components/sign-in";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between p-5 ">
        <div className="font-bold text-2xl">Tinycode</div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Get Started</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Sign In</DialogTitle>
              </DialogHeader>
              <SignIn />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex justify-center w-full pt-[30vh]">
        <h1 className="text-3xl font-bold">Low code Automation tool</h1>
      </div>
    </div>
  );
}
