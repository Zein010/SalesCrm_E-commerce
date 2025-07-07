import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Datatable from '../tables/datatable';
import TextLink from '@/components/text-link';
import { Row } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients',
        href: '/clients',
    },
];

export default function Client() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />
            <div className=" rounded-xl p-4 overflow-x-auto">
                <div className="relative p-4  overflow-hidden rounded-xl border border-sidebar-border/70  dark:border-sidebar-border">
                    <Datatable config={{
                        url: "clients", addUrl: route("clients.create"),
                        columnConf: [
                            { name: "id", selectable: true, visible: false, friendlyName: "ID", filterable: false },
                            {
                                name: "username", formatter: (row: Row<unknown>) => {
                                    return <TextLink href={route(`clients.edit`, { client: row.getValue("id") })}>
                                        {row.getValue("username")}
                                    </TextLink>
                                }, visible: true, friendlyName: "Username", filterable: true,
                            },
                            { name: "name", visible: true, friendlyName: "Name", filterable: true, },
                            { name: "email", visible: true, friendlyName: "Email", filterable: true },
                            { name: "phone", visible: true, friendlyName: "Phone", filterable: true },],
                    }} />  </div>
            </div>
        </AppLayout>
    );
}
