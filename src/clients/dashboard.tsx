'use client';

import StoreDemoCard from "@/components/custom/store-demo-card";
import { endpoints } from "@/lib/api-endpoints";
import { StoreDemo } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function DashboardClient() {

    const [loading, setLoading] = useState(true);
    const [stores, setStores] = useState<StoreDemo[]>([]);

    const fetchStores = async () => {
        try {
            setLoading(true);
            const response = await fetch(endpoints.listStores)
            const result = await response.json();
            if (!response.ok) {
                toast.error(
                    "Error fetching stores!", {
                    description: result?.data?.error || "Unknown error occurred while fetching stores, please try again later.",
                    action: {
                        label: "Retry",
                        onClick: () => {
                            fetchStores();
                        }
                    }
                })
            } else {
                setStores(result.data);
                toast.success(
                    "Stores fetched successfully!", {
                    description: "Stores have been successfully fetched.",
                })
            }
        } catch (error) {
            toast.error(
                "Error fetching stores!", {
                description: error instanceof Error ? error.message : "Unknown error occurred while fetching stores, please try again later.",
                action: {
                    label: "Retry",
                    onClick: () => {
                        fetchStores();
                    }
                }
            })
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (stores.length === 0) {
            fetchStores();
        }
    }, [stores]);

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-full gap-2 text-muted-foreground">
                <Loader2 className="animate-spin" size={24} />
                <p>Loading stores...</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 justify-start items-start w-full h-full gap-2 p-5">
            {stores.map((store) => (
                <StoreDemoCard key={store.name} store={store} />
            ))}
        </div>
    );
}
