import { useEffect, useState } from "react";
import { getMatchById } from "../../../api";
import { LIVE_REFRESH_MS } from "../constants";

export default function useMatchDetail(matchId, previewMatch) {
  const [selectedMatch, setSelectedMatch] = useState(previewMatch);
  const [detailLoading, setDetailLoading] = useState(Boolean(matchId));
  const [detailError, setDetailError] = useState(null);

  useEffect(() => {
    if (!matchId) {
      setSelectedMatch(null);
      setDetailLoading(false);
      setDetailError(null);
      return undefined;
    }

    let active = true;
    setSelectedMatch(previewMatch);
    setDetailLoading(true);
    setDetailError(null);

    getMatchById(matchId)
      .then((full) => {
        if (active) setSelectedMatch(full);
      })
      .catch((e) => {
        if (active) setDetailError(e.message);
      })
      .finally(() => {
        if (active) setDetailLoading(false);
      });

    return () => {
      active = false;
    };
  }, [matchId, previewMatch]);

  useEffect(() => {
    if (!matchId || selectedMatch?.status !== "live") return undefined;

    let active = true;
    const id = setInterval(() => {
      getMatchById(matchId)
        .then((full) => {
          if (active) setSelectedMatch(full);
        })
        .catch(() => {});
    }, LIVE_REFRESH_MS);

    return () => {
      active = false;
      clearInterval(id);
    };
  }, [matchId, selectedMatch?.status]);

  return {
    detailError,
    selectedMatch,
    detailLoading,
  };
}
