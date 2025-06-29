import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Datatable from '../tables/datatable';
import TextLink from '@/components/text-link';
import { Row } from '@tanstack/react-table';
import { useState } from 'react';
import { TagNew } from './tags.new';
import { Button } from '@headlessui/react';
import { TagEdit } from './tags.edit';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tags',
        href: '/tags',
    },
];

export default function Tags() {
    const [newOpen, setNewOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [editId, setEditId] = useState<number>(0);
    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <TagNew open={newOpen} setOpen={setNewOpen} />
            <TagEdit open={editOpen} setOpen={setEditOpen} id={editId} />
            <Head title="Tags" />

            <div className=" rounded-xl p-4 overflow-x-auto">
                <div className="relative p-4  overflow-hidden rounded-xl border border-sidebar-border/70  dark:border-sidebar-border">
                    <Datatable config={{
                        url: "tags", addSetState: setNewOpen,
                        columnConf: [
                            { name: "id", selectable: true, visible: false, friendlyName: "ID", filterable: false },
                            {
                                name: "name", formatter: (row: Row<unknown>) => {
                                    return <TextLink href='#' onClick={(e) => { e.preventDefault(); setEditOpen(true); setEditId(row.getValue("id")) }}  >
                                        {row.getValue("name")}
                                    </TextLink>
                                }, visible: true, friendlyName: "Tag", filterable: true,
                            },
                            { name: "user_name", visible: true, friendlyName: "Created By", filterable: true },
                            { name: "created_at", visible: true, friendlyName: "Created At", datetime: true, filterable: true },
                        ]
                        ,
                    }} />  </div>
            </div>
        </AppLayout>
    );
}
