// app/profile/[id]/page.jsx
import {notFound} from "next/navigation";
import ProfileClient from "@/src/app/components/ProfileClient";

const ProfilePage = async ({params}) => {
    const {id} = await params;

    if (!id) {
        notFound(); // Server-side 404
    }

    // Burada fetch veya DB sorgusu da yapılabilir:
    // const user = await getUserById(id);
    // if (!user) notFound();

    return <ProfileClient userId={id}/>;
};

export default ProfilePage;
