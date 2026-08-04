import { useEffect, useState } from "react";
import { getMatchById } from "../../../api";

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

  return {
    detailError,
    selectedMatch,
    detailLoading,
  };
}
