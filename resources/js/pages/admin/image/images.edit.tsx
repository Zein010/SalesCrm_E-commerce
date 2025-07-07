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
import axios from "@/lib/axios"
import { FormEventHandler, useEffect } from "react"
import { toast, Toaster } from "sonner"

type TagForm = {
    title: string | null
    alt_text: string | null
    caption: string | null
    image: File | null
    file_path: string | null,
    height: number,
    width: number,
    id: number
    _method: string,
}
export function ImageEdit({ open, setOpen, id, setReload, reload }: { open: boolean, setOpen: any, id: number, setReload: any, reload: boolean }) {
    useEffect(() => {
        reset()
        clearErrors();
        if (id == 0)
            return;


        axios.get(route("images.show", { image: id })).then((response: { data: { id: number, file_path: string, width: number, height: number, alt_text: string | null, caption: string | null, title: string | null } }) => {

            setData("alt_text", response.data.alt_text);
            setData("caption", response.data.caption);
            setData("title", response.data.title);
            setData("file_path", response.data.file_path)
            setData("height", response.data.height);
            setData("width", response.data.width);
            setData("id", response.data.id);
        });
    }, [id, reload])
    const { data, setData, post, processing, clearErrors, errors, reset } = useForm<Required<TagForm>>({

        title: "",
        id: 0,
        alt_text: "",
        caption: "",
        image: null,
        file_path: null,
        height: 0,
        width: 0,
        _method: "PATCH"

    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("images.update", { image: data.id }), {
            onSuccess: () => { toast.success('Image has been changed'); setOpen(false); setReload((reload: boolean) => !reload) },
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
                            <DialogTitle>Change Image</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="flex justify-center">
                                <img src={data.file_path ?? "null"} style={{ height: "300px", objectFit: "contain" }} />
                            </div>
                            <div className="grid gap-3">
                                <Input value={data.title ?? ""} onChange={(e) => { setData("title", e.target.value) }} id="title" name="title" placeholder="Image title" />
                                <InputError message={errors.title} />

                            </div>
                            <div className="grid gap-3">
                                <Textarea value={data.alt_text ?? ""} onChange={(e) => { setData("alt_text", e.target.value) }} id="alt_text" name="alt_text" placeholder="Image description" />
                                <InputError message={errors.alt_text} />
                            </div>

                            <div className="grid gap-3">
                                <Textarea value={data.caption ?? ""} onChange={(e) => { setData("caption", e.target.value) }} id="caption" name="caption" placeholder="Image Caption" />
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
                            <Button type="submit" >Change</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}
