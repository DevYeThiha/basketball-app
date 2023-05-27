import { Player, useGetPostsQuery } from "@/slices/playerSlice";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface usePlayersProps {
    
}
 
const usePlayers = () => {
    const [page, setPage] = useState<number>(1);
    const [players, setPlayers] = useState<{
      data: Array<Player>;
      lastPage: number;
    }>({
      data: [],
      lastPage: 0,
    });
    const playerQuery = useGetPostsQuery({ page: page, perPage: 10 });
    const { ref, inView, entry } = useInView({
      /* Optional options */
      threshold: 0,
    });
    useEffect(() => {
      const playerResponse = playerQuery.data;
      if (playerResponse && playerResponse.meta.current_page > players.lastPage) {
        setPlayers((pre) => ({
          data: [...pre.data, ...playerResponse.data],
          lastPage: pre.lastPage + 1,
        }));
      }
  
      //eslint-disable-next-line
    }, [playerQuery.data]);
    useEffect(() => {
      if (inView || playerQuery.data?.meta.next_page) {
        setPage((pre) => pre + 1);
      }
    }, [inView]);

    return {
        ref,
        data: players.data,
        query: playerQuery
    }
}
 
export default usePlayers;