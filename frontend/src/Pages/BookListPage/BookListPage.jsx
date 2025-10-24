import {useState, useEffect} from "react";
import { getRequests } from "../../service/booking";
import { getMe } from "../../service/userService";

function BookListPage() {
    const [Booking, setBooking] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const [editingBooking, setEditingBooking] = useState(null);

    const fetchBookings = async () => {
        setIsLoading(true);
        const token = Cookies.get("token");
        if (!token) {
            setError("กรุณาเข้าสู่ระบบเพื่อดูรายการจอง");
            setIsLoading(false);
            return;
        }

        const response = await getRequests();
        setBooking(response.data);

    };

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            getMe().then(data => {
                if (data.success) {
                    console.log("user = ", data.data.name);
                    setUser(data.data);
                }
            });
        }
        fetchBookings();
    }, []);

    if (isLoading) return <div>Loading...</div>
    if (error) return <div className="text-red-500">{error}</div>
}

export default BookListPage;