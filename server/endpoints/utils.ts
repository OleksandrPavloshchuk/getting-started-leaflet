export const handleError = (res, err) => {
    console.error("Database error:", err);
    res.status(500).json({error: "Database query failed"});
};

export const SEARCH_CENTERS_KEY = "searchCenters:";