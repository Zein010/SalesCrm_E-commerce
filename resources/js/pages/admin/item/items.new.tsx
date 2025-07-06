import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import axios from '@/lib/axios';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Plus, RefreshCw, X } from 'lucide-react';

import { toast, Toaster } from "sonner"
import { TagNew } from '../tag/tags.new';
import { ImageNew } from '../image/images.new';
import ImageLibrary from '../image/images.library';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Items',
        href: '/items',
    }, {
        title: 'New Item',
        href: '/items/new',
    },
];

type ItemForm = {
    name: string,
    description: string,
    categories: number[],
    tags: number[],
    images: { file_path: string, id: number }[],
    
}
export default function ItemNew() {

    const { data, setData, post, errors } = useForm<ItemForm>({ categories: [], name: "", description: "", tags: [], images: [] })
    const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
    const [reloadCategories, setReloadCategories] = useState<boolean>(false);
    const [tags, setTags] = useState<{ id: number, name: string }[]>([]);
    const [reloadTags, setReloadTags] = useState<boolean>(false);
    const [newTagOpen, setNewTagOpen] = useState<boolean>(false);
    const [newImageOpen, setNewImageOpen] = useState<boolean>(false);
    const [imageLibraryOpen, setImageLibraryOpen] = useState<boolean>(false);
    
    const isFirstRender = useRef(true);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("item.store"), {
            onSuccess: () => { },
            onError: () => { }
        });
    }
    useEffect(() => {
        axios.get(route("tags.index"), { params: { all: true } }).then((response) => {

            setTags(response.data);


        }).catch((e) => { });

    }, [reloadTags]);
    useEffect(() => {
        axios.get(route("categories.index"), { params: { all: true } }).then((response) => {
            setCategories(response.data);
        }).catch((e) => { });
    }, [reloadCategories]);
    console.log(data.images)
    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Item" />
            <Toaster />
            <TagNew setOpen={setNewTagOpen} open={newTagOpen} setReload={setReloadTags} />
            <form onSubmit={submit}>
                <div className=" rounded-xl p-4 overflow-x-auto">
                    <div className="p-4 gap-4 grid  rounded-xl border border-sidebar-border/70  dark:border-sidebar-border">

                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                required


                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="John"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder='description...' required value={data.description} onChange={(e) => { setData("description", e.target.value) }} />
                            <InputError message={errors.description} />
                        </div>

                        <div className="grid gap-2">

                            <Label htmlFor="categories">Categories</Label>
                            <DropdownMenu>
                                <div className='w-full flex gap-2'>
                                    <DropdownMenuTrigger asChild className='w-full' >
                                        <Button variant="outline" className="w-full text-left">
                                            Categories <ChevronDown />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <Button type='button' variant="outline" onClick={(e) => { e.preventDefault(); setReloadCategories((old: boolean) => !old) }}> <RefreshCw /></Button>
                                    <Link target="_blank" href={route("categories.create")}>
                                        <Button variant="outline"> <Plus /></Button>
                                    </Link>
                                </div>
                                <DropdownMenuContent style={{ overflowY: "scroll", maxHeight: "200px" }} >
                                    {
                                        categories.map(category => {
                                            return <DropdownMenuCheckboxItem

                                                className="capitalize"
                                                checked={data.categories.includes(category.id)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setData("categories", [...(data.categories), category.id]);
                                                    } else {
                                                        setData("categories", (data.categories).filter(id => id !== category.id));
                                                    }
                                                }}
                                            >{category.name}
                                            </DropdownMenuCheckboxItem>

                                        })
                                    }
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <div className='flex flex-wrap gap-2'>
                                {categories.filter(category => data.categories.includes(category.id)).map(category => {
                                    return <div className=' gap-1 items-center flex rounded-lg border-2 py-1 px-2  w-fit text-xs border-brown-500'>
                                        <X color='red' onClick={() => { setData("categories", (data.categories).filter(id => id !== category.id)) }} size={15} />{category.name}</div>
                                })}

                            </div>

                        </div>



                        <div className="grid gap-2">

                            <Label htmlFor="tags">Tags</Label>
                            <DropdownMenu>
                                <div className='w-full flex gap-2'>
                                    <DropdownMenuTrigger asChild className='w-full' >
                                        <Button variant="outline" className="w-full text-left">
                                            Tags <ChevronDown />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <Button type='button' variant="outline" onClick={(e) => { e.preventDefault(); setReloadTags((old: boolean) => !old) }}> <RefreshCw /></Button>
                                    <Button type='button' variant="outline" onClick={(e) => { e.preventDefault(); setNewTagOpen(true) }}> <Plus /></Button>

                                </div>
                                <DropdownMenuContent style={{ overflowY: "scroll", maxHeight: "200px" }} >
                                    {
                                        tags.map(tag => {
                                            return <DropdownMenuCheckboxItem

                                                className="capitalize"
                                                checked={data.tags.includes(tag.id)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setData("tags", [...(data.tags), tag.id]);
                                                    } else {
                                                        setData("tags", (data.tags).filter(id => id !== tag.id));
                                                    }
                                                }}
                                            >{tag.name}
                                            </DropdownMenuCheckboxItem>

                                        })
                                    }
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <div className='flex flex-wrap gap-2'>
                                {tags.filter(tag => data.tags.includes(tag.id)).map(tag => {
                                    return <div className=' gap-1 items-center flex rounded-lg border-2 py-1 px-2  w-fit text-xs border-brown-500'>
                                        <X color='red' onClick={() => { setData("tags", (data.tags).filter(id => id !== tag.id)) }} size={15} />{tag.name}</div>
                                })}

                            </div>

                        </div>

                        <div className="grid gap-2">

                            <Label htmlFor="Images">Images</Label>
                            <div className='flex gap-2 '>
                                <Button type='button' className='grow' onClick={() => { setImageLibraryOpen(true) }}>Add From Library</Button>
                                <Button type='button' className='grow' onClick={() => setNewImageOpen(true)}>Upload New</Button>
                                <ImageLibrary preSelect={data.images} addImages={(images: { file_path: string, id: number }[]) => { setData("images", images) }} setOpen={setImageLibraryOpen} open={imageLibraryOpen} />
                                <ImageNew open={newImageOpen} setOpen={setNewImageOpen} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
