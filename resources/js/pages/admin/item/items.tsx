import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Datatable from '../tables/datatable';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Items',
        href: '/items',
    },
];

export default function Items() {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Items" />
            <div className=" rounded-xl p-4 overflow-x-auto">
                <div className="p-4  rounded-xl border border-sidebar-border/70  dark:border-sidebar-border">
                    <Datatable config={{
                        url: "api/items",
                        columnConf: [
                            { name: "id", selectable: true, visible: false, friendlyName: "ID", filterable: false },
                            { name: "name", visible: true, friendlyName: "Name", filterable: true, },
                            { name: "created_at", visible: true, friendlyName: "Created At", filterable: true, datetime: true },
                            { name: "user_name", visible: true, friendlyName: "Created By", filterable: true },
                            { name: "price", header: <div className='text-right'>Price</div>, visible: true, friendlyName: "Price", filterable: true, currency: true },

                        ],
                    }} />  </div>
            </div>
        </AppLayout>
    );
}
