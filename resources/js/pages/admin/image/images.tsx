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
import { ImageEdit } from './images.edit';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Images',
        href: '/images',
    },
];

export default function Images() {
    const [images, setImages] = useState<{ url: string, id: number, file_path: string }[] | null>(null)
    const [displayCount, setDisplayCount] = useState<number>(20)
    const [totalImages, setTotalImages] = useState<number | null>();
    const [newOpen, setNewOpen] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [editId, setEditId] = useState<number>(0);
    useEffect(() => {
        axios.get(route("images.index"), { params: { total: displayCount } }).then((response) => {
            setImages(response.data.data)

            setTotalImages(response.data.total);
        })
    }, [displayCount, reload])
    return (


        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Images" />

            <div className=" rounded-xl  p-4 overflow-x-auto">
                <ImageNew setReload={setReload} open={newOpen} setOpen={setNewOpen} />
                <ImageEdit reload={reload} setReload={setReload} open={editOpen} setOpen={setEditOpen} id={editId} />
                <div className='flex mb-4 justify-end'> <Button variant="outline" onClick={() => { setNewOpen(true) }}>Add New</Button></div>
                <div className=" rounded-xl border border-sidebar-border/70  dark:border-sidebar-border">
                    <div className='relative flex-wrap p-4  gap-4 flex  overflow-hidden'>

                        {images ? (images.length == 0 ? "No images uploaded yet" : images.map((image) => { return <div className='border-2 hover:border-gray-400 transition shadow   p-2 rounded' onClick={() => { setEditOpen(true), setEditId(image.id) }}><img style={{ width: "150px", aspectRatio: "16/9", objectFit: "contain" }} src={image.file_path} /></div> })) : "Loading Images..."}
                    </div>

                    <div className='flex mb-4 justify-center'>

                        {totalImages && totalImages > displayCount ? (<Button onClick={() => { setDisplayCount((x) => x + 20) }}>Show More</Button>) : ""}
                    </div>
                </div>
            </div>

        </AppLayout>
    );
}
