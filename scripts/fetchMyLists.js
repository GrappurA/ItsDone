const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
        global: {
            headers: {
                Authorization: `Bearer ${session?.supabaseAccessToken}`
            }
        }
    }
);

useEffect(() => {
    async function fetchMyLists() {

        if (!session?.user?.id || !session?.supabaseAccessToken) {
            setIsLoadingLists(false)
            return
        }

        const { data, error } = await supabase
            .from("todo_lists")
            .select("*")
            .eq("owner_id", session.user.id)
            .order("created_at", { ascending: false })

        if (error?.message.includes("JWT expired") || error?.code == "PGRST301") {
            signOut({ callbackUrl: "/" })
            return
        }
        else if (error) {
            console.error(error)
            return
        }

        setUserLists(data)
        setIsLoadingLists(false)
    }

    fetchMyLists()
}, [session])