import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "@inertiajs/react"
import { DialogDescription } from "@radix-ui/react-dialog"
import { FormEventHandler } from "react"
import { toast, Toaster } from "sonner"

type TagForm = {
    name: string
    description: string
}
export function TagNew({ open, setOpen, setReload }: { open: boolean, setOpen: any, setReload: any }) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<TagForm>>({

        name: "",
        description: ""

    });
    const submit: FormEventHandler = (e) => {
        console.log("sss")
        e.preventDefault();
        post(route("tags.store"), {
            onSuccess: (e) => { toast.success('Tag has been created'), reset(), setOpen(false), setReload((old: boolean) => !old) },
            onError: () => { toast.error('Something went wrong') },
        })
    }


    return (
        <div>
            <Toaster />
            <Dialog open={open} onOpenChange={(newState) => setOpen(newState)}>

                <DialogContent className="sm:max-w-[425px] gap-2">
                    <form onSubmit={submit} className="gap-2">
                        <DialogHeader className="mb-4">
                            <DialogTitle>Create Tag</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Input required onChange={(e) => { setData("name", e.target.value) }} id="name" name="name" placeholder="Tag Name" />
                                <InputError message={errors.name} />

                            </div>
                            <div className="grid gap-3">
                                <Textarea required onChange={(e) => { setData("description", e.target.value) }} id="description" name="description" placeholder="Tag description" />
                                <InputError message={errors.description} />
                            </div>

                        </div>
                        <DialogFooter className="mt-4">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" >Create</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}
