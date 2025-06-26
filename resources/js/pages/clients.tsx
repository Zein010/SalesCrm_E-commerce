import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import DataTableDemo from './tables/DataTableDemo';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients',
        href: '/clients',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

                <div className="relative min-h-[100vh] p-3 flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <DataTableDemo config={{
                        columnConf: [{ name: "id", selectable: true, visible: false, friendlyName: "ID", filterable: false }, { name: "status", visible: true, formatter: (value: string) => { return <div className='capitalize'>{value}</div> }, friendlyName: "Status", filterable: true, filterOptions: [{ friendlyName: "Success", value: "success" }, { friendlyName: "Processing", value: "processing" }, { friendlyName: "Failed", value: "failed" }] }, { name: "email", visible: true, friendlyName: "Email", filterable: true }, { name: "amount", currency: true, header: <div className='text-right'>Amount</div>, visible: true, friendlyName: "Amount", filterable: false }],
                        data:
                            [{
                                id: "m5gr84i9",
                                amount: 316,
                                status: "success",
                                email: "ken99@example.com",
                            },
                            {
                                id: "3u1reuv4",
                                amount: 242,
                                status: "success",
                                email: "Abe45@example.com",
                            },
                            {
                                id: "derv1ws0",
                                amount: 837,
                                status: "processing",
                                email: "Monserrat44@example.com",
                            },
                            {
                                id: "5kma53ae",
                                amount: 874,
                                status: "success",
                                email: "Silas22@example.com",
                            },
                            {
                                id: "bhqecj4p",
                                amount: 721,
                                status: "failed",
                                email: "carmella@example.com",
                            },
                            ]
                    }} />  </div>
            </div>
        </AppLayout>
    );
}
