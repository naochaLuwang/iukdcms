import {Metadata} from "next";

export const metadata: Metadata = {
    title:"Dashboard | Rely CMS 2 "

}


export default async function DashboardLayout({
                                                  children,
                                              }: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );

}