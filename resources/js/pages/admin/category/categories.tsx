import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Datatable from '../tables/datatable';
import TextLink from '@/components/text-link';
import { Row } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
];

export default function Categories() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className=" rounded-xl p-4 overflow-x-auto">
                <div className="relative p-4  overflow-hidden rounded-xl border border-sidebar-border/70  dark:border-sidebar-border">
                    <Datatable config={{
                        url: "categories", addUrl: route("categories.create"),
                        columnConf: [
                            { name: "id", selectable: true, visible: false, friendlyName: "ID", filterable: false },
                            {
                                name: "name", formatter: (row: Row<unknown>) => {
                                    return <TextLink href={route(`categories.edit`, { category: row.getValue("id") })}>
                                        {row.getValue("name")}
                                    </TextLink>
                                }, visible: true, friendlyName: "Category", filterable: true,
                            },
                            { name: "parent_category_name", visible: true, friendlyName: "Parent Category", filterable: true },
                            { name: "user_name", visible: true, friendlyName: "Created By", filterable: true },
                            { name: "created_at", visible: true, friendlyName: "Created At", datetime: true, filterable: true },
                        ]
                        ,
                    }} />  </div>
            </div>
        </AppLayout>
    );
}
