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
import axios from "@/lib/axios";
import { FormEventHandler, useEffect, useState } from "react"
import { toast, Toaster } from "sonner"

type TagForm = {
    name: string
    description: string
    id: number
}
export function TagEdit({ open, setOpen, id }: { open: boolean, setOpen: any, id: number }) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<TagForm>>({
        id: id,
        name: "",
        description: ""

    });
    useEffect(() => {
        if (open) {
            axios.get(route("tags.show", { tag: id })).then(response => {
                setData("name", response.data.name)
                setData("id", response.data.id)
                setData("description", response.data.description)
            }).catch(() => {
                console.log("error")
            })
        }
    }, [open]);

    const submit: FormEventHandler = (e) => {
        console.log("sss")
        e.preventDefault();
        post(route("tags.store"), {
            onSuccess: () => { toast.success('Tag has been created') },
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
                                <Input required onChange={(e) => { setData("name", e.target.value) }} value={data.name} id="name" name="name" placeholder="Tag Name" />
                                <InputError message={errors.name} />

                            </div>
                            <div className="grid gap-3">
                                <Textarea required onChange={(e) => { setData("description", e.target.value) }} id="description" name="description" value={data.description} placeholder="Tag description" />
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
