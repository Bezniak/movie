import { useCallback, useEffect, useState } from "react";
import { makeRequest } from "../makeRequest";

const useFetchAllData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Изменено на null

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await makeRequest.get(url);
            setData(res.data);
        } catch (error) {
            setError(error); // Устанавливаем ошибку в состояние
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error };
};

export default useFetchAllData;
