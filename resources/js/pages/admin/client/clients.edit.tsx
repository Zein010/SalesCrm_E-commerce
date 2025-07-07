import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import Datatable from '../tables/datatable';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Toaster, toast } from 'sonner';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { styleText } from 'util';

var breadcrumbs: BreadcrumbItem[] = [{
    title: 'Clients',
    href: `/clients`,
}, {
    title: 'Editing Client',
    href: `/clients/`,
}]
type ClientForm = {
    id: number;
    email: string;
    username: string;
    first_name: string,
    last_name: string,
    phone: string,
    password: string;
};

export default function ClientEdit({ client }: { client: ClientForm }) {

    const { data, setData, put, processing, errors, reset } = useForm<Required<ClientForm>>({
        id: client.id,
        email: client.email,
        username: client.username,
        first_name: client.first_name,
        last_name: client.last_name,
        phone: client.phone,
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('clients.update', { client: client.id }), {
            onSuccess: () => { toast.success('Client has been updated') },
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
                                <Label htmlFor="first_name">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    required
                                    autoFocus

                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                    placeholder="john.doe"
                                />
                                <InputError message={errors.username} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="first_name">First Name</Label>
                                <Input
                                    id="first_name"
                                    type="text"
                                    required


                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    placeholder="John"
                                />
                                <InputError message={errors.first_name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last_name">Last Name</Label>
                                <Input
                                    id="last_name"
                                    type="text"
                                    required


                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    placeholder="Doe"
                                />
                                <InputError message={errors.last_name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required


                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="text"
                                    required


                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="71 123 456"
                                />
                                <InputError message={errors.phone} />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>

                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    tabIndex={2}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="[Unchanged]"
                                />
                                <InputError message={errors.password} />
                            </div>



                            <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Update
                            </Button>
                        </div>

                    </form>

                </div>
                <div className='p-4 flex-1  rounded-xl border border-sidebar-border/70 dark:border-sidebar-border'>
                    <Datatable config={{
                        url: `api/comments?client_id=${client.id}`,
                        columnConf: [
                            { name: "item_name", visible: true, friendlyName: "Item Name", filterable: true, },
                            { name: "content", visible: true, friendlyName: "Comment", filterable: true, },
                            { name: "created_at", visible: true, friendlyName: "Created At", datetime: true, filterable: true },
                        ]
                    }} />
                </div>

            </div>
        </AppLayout>
    );
}
