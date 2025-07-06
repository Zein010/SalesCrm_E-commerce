import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "@/lib/axios";
import { Check } from "lucide-react";
import { useEffect, useState } from "react"

export default function ImageLibrary({ open, preSelect, setOpen, addImages }: { open: boolean, setOpen: any, addImages: any, preSelect: { id: number, file_path: string }[] }) {

    const [images, setImages] = useState<{ id: number, file_path: string, width: number, height: number, alt_text: string, caption: string, title: string }[]>([]);

    const [displayCount, setDisplayCount] = useState<number>(20);
    const [totalImages, setTotalImages] = useState<number | null>(20)
    const [selectedImages, setSelectedImages] = useState<number[]>([]);
    // laod images
    useEffect(() => {
        if (open) {
            const imageIds: number[] = [];
            preSelect.map((image) => { imageIds.push(image.id) })
            setSelectedImages(imageIds)
            axios.get(route("images.index"), { params: { total: totalImages } }).then(response => {
                setImages(response.data.data)
                setTotalImages(response.data.total);
            });
        }
    }, [open])
    return <Dialog open={open} onOpenChange={(newState) => setOpen(newState)}>

        <DialogContent className="sm:max-w-[450px] md:max-w-[670px] gap-2">
            <DialogHeader className="mb-4">
                <DialogTitle>Select Images</DialogTitle>
            </DialogHeader>
            <div className="relative flex-wrap p-4 gap-4 flex overflow-hidden">
                {images ? (
                    images.length === 0 ? (
                        "No images uploaded yet"
                    ) : (
                        images.map((image) => (
                            <div
                                key={image.id}
                                className="relative border-2 hover:border-gray-400 transition shadow p-2 rounded"
                                onClick={() => {
                                    selectedImages.includes(image.id)
                                        ? setSelectedImages((old: number[]) => old.filter((id) => id !== image.id))
                                        : setSelectedImages((old: number[]) => [...old, image.id]);
                                }}
                            >
                                <img
                                    style={{ width: "150px", aspectRatio: "16/9", objectFit: "contain" }}
                                    src={`${window.location.origin}/${image.file_path}`}
                                />

                                {selectedImages.includes(image.id) ? <Check className="absolute top-1 right-1 bg-blue-600 rounded-full p-0.5" /> : ""}
                            </div>
                        ))
                    )
                ) : (
                    "Loading Images..."
                )}
            </div>
            <DialogFooter className="mt-4">
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" onClick={() => { setOpen(false); addImages(images.filter(image => selectedImages.includes(image.id))), setSelectedImages([]) }}>Add</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog >


}