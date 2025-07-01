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
    title: string
    alt_text: string
    caption: string
    image: File | null
}
export function ImageNew({ open, setOpen, setReload }: { open: boolean, setOpen: any, setReload: any }) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<TagForm>>({

        title: "",
        alt_text: "",
        caption: "",
        image: null

    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("images.store"), {
            onSuccess: () => { toast.success('Image has been created'); setOpen(false); setReload((reload: boolean) => !reload) },
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
                                <Input onChange={(e) => { setData("title", e.target.value) }} id="title" name="title" placeholder="Image title" />
                                <InputError message={errors.title} />

                            </div>
                            <div className="grid gap-3">
                                <Textarea onChange={(e) => { setData("alt_text", e.target.value) }} id="alt_text" name="alt_text" placeholder="Image description" />
                                <InputError message={errors.alt_text} />
                            </div>

                            <div className="grid gap-3">
                                <Textarea onChange={(e) => { setData("caption", e.target.value) }} id="caption" name="caption" placeholder="Image Caption" />
                                <InputError message={errors.caption} />
                            </div>
                            <div className="grid gap-3">
                                <Input required onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setData("image", e.target.files[0]);
                                    }
                                }} type="file" multiple={false} id="image" name="image" placeholder="Image"
                                    accept="image/*" />
                                <InputError message={errors.image} />

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
