import {notFound} from "next/navigation";
import ProfileClient from "@/src/app/components/ProfileClient";

const ProfilePage = async ({params}) => {
    const {id} = await params;

    if (!id) {
        notFound();
    }

    return <ProfileClient userId={id}/>;
};

export default ProfilePage;
