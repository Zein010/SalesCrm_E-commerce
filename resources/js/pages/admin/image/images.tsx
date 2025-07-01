import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Datatable from '../tables/datatable';
import TextLink from '@/components/text-link';
import { Row } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { ImageNew } from './images.new';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Images',
        href: '/images',
    },
];

export default function Images() {
    const [images, setImages] = useState<{ url: string, id: number, file_path: string }[] | null>(null)
    const [totalImages, setTotalImages] = useState<number>(20)
    const [newOpen, setNewOpen] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    useEffect(() => {
        axios.get(route("images.index"), { params: { total: totalImages } }).then((response) => {
            setImages(response.data.data)
        })
    }, [totalImages, reload])
    return (


        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Images" />

            <div className=" rounded-xl  p-4 overflow-x-auto">
                <ImageNew setReload={setReload} open={newOpen} setOpen={setNewOpen} />
                <div className='flex mb-4 justify-end'> <Button variant="outline" onClick={() => { setNewOpen(true) }}>Add New</Button></div>
                <div className="relative flex-wrap p-4  gap-4 flex flex  overflow-hidden rounded-xl border border-sidebar-border/70  dark:border-sidebar-border">

                    {images ? (images.length == 0 ? "No images uploaded yet" : images.map((image) => { return <div className='border-2 hover:border-gray-400 transition shadow   p-2 rounded'><img style={{ width: "150px", aspectRatio: "16/9", objectFit: "contain" }} src={image.file_path} /></div> })) : "Loading Images..."}

                </div>
            </div>
        </AppLayout>
    );
}
