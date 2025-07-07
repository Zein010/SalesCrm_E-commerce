import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import Datatable from '../tables/datatable';
import { Head, useForm } from '@inertiajs/react';
import { ChevronDown, LoaderCircle, X } from 'lucide-react';
import { Children, FormEventHandler } from 'react';
import { Toaster, toast } from 'sonner';

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input, } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"

import TextLink from '@/components/text-link';
import { Row } from '@tanstack/react-table';

var breadcrumbs: BreadcrumbItem[] = [{
    title: 'Categories',
    href: `/categories`,
}, {
    title: 'Editing Category',
    href: `/categoriyes/`,
}]
type CategoryForm = {
    id: number;
    name: string;
    description: string;
    category_id: number,
    children: number[],
};

export default function CategoryEdit({ category, categories }: { category: CategoryForm, categories: { id: number, category_id: number, name: string }[] }) {

    var tempCategories: number[] = [];
    categories.forEach(subCategory => { if (subCategory.category_id == category.id) tempCategories.push(subCategory.id) })
    const { data, setData, put, processing, errors, reset } = useForm<Required<CategoryForm>>({
        id: category.id,
        name: category.name,
        description: category.description,
        category_id: category.category_id,
        children: tempCategories
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('categories.update', { category: category.id }), {
            onSuccess: () => { toast.success('Category has been updated') },
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
                                    placeholder="john.doe"
                                />
                                <InputError message={errors.name} />
                            </div>


                            <div className="grid gap-2">
                                <Label htmlFor="subCategories">Sub Categories</Label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="text-left">
                                            Sub Categories <ChevronDown />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent style={{ overflowY: "scroll", maxHeight: "200px" }} align="start">
                                        {
                                            categories.map(subCategory => {
                                                if (subCategory.id != category.id && subCategory.id != category.category_id) {
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
                                                }
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

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    required
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Description"
                                />

                                <InputError message={errors.description} />
                            </div>



                            <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Update
                            </Button>
                        </div>

                    </form>
                </div>

            </div >
        </AppLayout >
    );
}
