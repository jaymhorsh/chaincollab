"use server";
import type { Stream } from "livepeer/models/components";
import axios from "axios";
import { InputCreatorIdType } from "livepeer/models/components";


interface CreateLivestreamProps {
  streamName: string;
  record: boolean;
  creatorId: string;
}
export const createLivestream = async ({
  streamName,
  record,
  creatorId,
}: CreateLivestreamProps) => {
  try {
    const response: Stream = await axios
      .post(
        "https://livepeer.studio/api/stream",
        {
          name: streamName,
          record: record,
          creatorId: {
            type: InputCreatorIdType.Unverified,
            value: creatorId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.STUDIO_API_KEY ?? "none"}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return response.data;
      });
    return {
      success: true,
      data: response,
    } as const;
  
  } catch (e: any) {
    console.error(e);
    return {
      success: false,
      error: e.response?.data?.error || "Could not create livestream.",
    } as const;
  }
};

// Get all streams function
export async function getAllStreams() {
  try {
    const response = await axios.get("https://livepeer.studio/api/stream", {
      headers: {
        Authorization: `Bearer ${process.env.STUDIO_API_KEY ?? "none"}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return {
      success: true,
      data: response.data,
    } as const;
  } catch (e: any) {
    console.log(e);
    return {
      success: false,
      error: e.response?.data?.error || "Could not retrieve streams.",
    } as const;
  }
}

// Get a specific stream by ID function
export async function getStreamById(id: string) {
  try {
    const response = await axios.get(
      `https://livepeer.studio/api/stream/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STUDIO_API_KEY ?? "none"}`,
        },
      }
    );
    console.log(response.data);
    return {
      success: true,
      data: response.data,
    } as const;
  } catch (e: any) {
    console.error(e);
    return {
      success: false,
      error: e.response?.data?.error || "Could not retrieve stream.",
    } as const;
  }
}

// Delete a stream function
export async function deleteStream(id: string) {
  try {
    const response = await axios.delete(
      `https://livepeer.studio/api/stream/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STUDIO_API_KEY ?? "none"}`,
        },
      }
    );
    console.log(response.data);
    return {
      success: true,
      data: response.data,
    } as const;
  } catch (e: any) {
    console.error(e);
    return {
      success: false,
      error: e.response?.data?.error || "Could not delete stream.",
    } as const;
  }
}

