import { useState } from "react";
import toast from "react-hot-toast";

const useSupplier = () => {
    const [loading, setLoading] = useState(false);

    const registerSupplier = async (companyName, phone, address) => {
        const success = handleInputErrors(companyName, phone, address);
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/supplier/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ companyName, phone, address }),
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success("Supplier registered successfully!");

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, registerSupplier };
};

export default useSupplier;

function handleInputErrors(companyName, phone, address) {
    if (!companyName || !phone || !address) {
        toast.error("Please fill in all fields");
        return false;
    }

    return true;
}
