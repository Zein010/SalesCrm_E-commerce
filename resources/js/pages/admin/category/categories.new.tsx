import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import Datatable from '../tables/datatable';
import { Head, useForm } from '@inertiajs/react';
import { ChevronDown, LoaderCircle, X } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Toaster, toast } from 'sonner';

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { styleText } from 'util';
import { Textarea } from '@/components/ui/textarea';

var breadcrumbs: BreadcrumbItem[] = [{
    title: 'Categories',
    href: `/categories`,
}, {
    title: 'Creating Category',
    href: `/categories/create`,
}]
type CategoryForm = {
    name: string;
    category_id: number;
    children: number[],
    description: string,
};

export default function CategoryNew({ categories }: { categories: { name: string, id: number }[] }) {

    const { data, setData, post, processing, errors, reset } = useForm<Required<CategoryForm>>({
        name: "",
        category_id: 0,
        children: [],
        description: ""
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('categories.store'), {
            onSuccess: () => { toast.success('Client has been created') },
            onError: () => { toast.error('Something went wrong') },

        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editing Client " />

            <Toaster />
            <div className=" flex gap-4  flex-col rounded-xl p-4 overflow-x-auto">
                <div className=" p-4 flex-1  rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus

                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Heaters..."
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    required
                                    autoFocus

                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Heating stuff.."
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-2">

                                <Label >Parent Category</Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">{data.category_id == 0 ? "None" : (categories.find(subCategory => subCategory.id == data.category_id)!.name)} <ChevronDown /></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent >
                                        <DropdownMenuLabel>Parent Category Options</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioGroup style={{ overflowY: "scroll", maxHeight: "200px" }} value={data.category_id.toString()} onValueChange={(value) => {

                                            setData("category_id", parseInt(value));
                                            setData("children", (data.children || []).filter(id => id !== parseInt(value)));

                                        }}>
                                            <DropdownMenuRadioItem value="0">None</DropdownMenuRadioItem>

                                            {categories.map(subCategory => {
                                                return <DropdownMenuRadioItem value={subCategory.id.toString()}>{subCategory.name}</DropdownMenuRadioItem>
                                            })}
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="grid gap-2">
                                <Label >Sub Categories</Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="text-left">
                                            Sub Categories <ChevronDown />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent style={{ overflowY: "scroll", maxHeight: "200px" }} >
                                        {
                                            categories.filter(subCategory => subCategory.id != data.category_id).map(subCategory => {
                                                return <DropdownMenuCheckboxItem

                                                    className="capitalize"
                                                    checked={data.children.includes(subCategory.id)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setData("children", [...(data.children || []), subCategory.id]);
                                                        } else {
                                                            setData("children", (data.children || []).filter(id => id !== subCategory.id));
                                                        }
                                                    }}
                                                >{subCategory.name}
                                                </DropdownMenuCheckboxItem>

                                            })
                                        }
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <div className='flex flex-wrap gap-2'>
                                    {categories.filter(subCategory => data.children.includes(subCategory.id)).map(subCategory => {
                                        return <div className=' gap-1 items-center flex rounded-lg border-2 py-1 px-2  w-fit text-xs border-brown-500'>
                                            <X color='red' onClick={() => { setData("children", (data.children || []).filter(id => id !== subCategory.id)) }} size={15} />{subCategory.name}</div>
                                    })}

                                </div>
                            </div>

                            <Button type="submit" className="mt-4 w-full" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Create
                            </Button>
                        </div>

                    </form>

                </div>

            </div>
        </AppLayout>
    );
}
