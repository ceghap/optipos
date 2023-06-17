import PrivateLayout from "@/components/layouts/PrivateLayout";
import { useSession } from "next-auth/react";

const Stock = () => {

  return (
    <PrivateLayout>
      <div>Stock</div>

    </PrivateLayout>
  );
};

export default Stock;
