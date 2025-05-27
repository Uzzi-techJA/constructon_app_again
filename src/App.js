
import React, { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";

export default function ConstructONPhase1() {
  const [query, setQuery] = useState("");
  const [material, setMaterial] = useState("");
  const [volume, setVolume] = useState("");
  const [driver, setDriver] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [ticketImage, setTicketImage] = useState(null);
  const [entries, setEntries] = useState([]);

  const handleAddEntry = () => {
    if (material && volume) {
      const newEntry = {
        id: Date.now(),
        material,
        volume,
        driver,
        description,
        startTime,
        endTime,
        duration: startTime && endTime ? ((endTime - startTime) / 60000).toFixed(2) + " min" : null,
        ticketImage: ticketImage ? URL.createObjectURL(ticketImage) : null,
      };
      setEntries([newEntry, ...entries]);
      setMaterial("");
      setVolume("");
      setDriver("");
      setDescription("");
      setStartTime(null);
      setEndTime(null);
      setTicketImage(null);
    }
  };

  const handleStart = () => setStartTime(new Date());
  const handleStop = () => setEndTime(new Date());

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded shadow p-4 sticky top-0 z-10">
        <h1 className="text-3xl font-bold mb-4">ConstructON</h1>
        <Label className="text-lg">Ask Anything</Label>
        <Input
          placeholder="e.g., How much concrete was used last week?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="text-sm text-gray-500 mt-1">AI search placeholder — future integration</p>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Log Trucking Entry</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Material</Label>
            <Input value={material} onChange={(e) => setMaterial(e.target.value)} placeholder="e.g., Asphalt" />
          </div>
          <div>
            <Label>Volume (m³ or yd³)</Label>
            <Input value={volume} onChange={(e) => setVolume(e.target.value)} placeholder="e.g., 5.5" />
          </div>
          <div>
            <Label>Driver Name</Label>
            <Input value={driver} onChange={(e) => setDriver(e.target.value)} placeholder="e.g., John Doe" />
          </div>
          <div className="flex gap-2 items-end">
            <Button onClick={handleStart}>Start</Button>
            <Button onClick={handleStop}>Stop</Button>
          </div>
          <div>
            <Label>Ticket Image</Label>
            <Input type="file" accept="image/*" onChange={(e) => setTicketImage(e.target.files[0])} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <Label>Description / Notes</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Details, issues, etc." />
          </div>
        </div>

        <div className="mt-4">
          <Button onClick={handleAddEntry}>Save Entry</Button>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Logged Entries</h2>
        {entries.length === 0 ? (
          <p className="text-gray-500">No entries yet.</p>
        ) : (
          entries.map(entry => (
            <Card key={entry.id} className="mb-2">
              <CardContent className="p-4 space-y-2">
                <p><strong>Material:</strong> {entry.material}</p>
                <p><strong>Volume:</strong> {entry.volume}</p>
                <p><strong>Driver:</strong> {entry.driver}</p>
                {entry.duration && <p><strong>Duration:</strong> {entry.duration}</p>}
                {entry.description && <p><strong>Description:</strong> {entry.description}</p>}
                {entry.ticketImage && <img src={entry.ticketImage} alt="ticket" className="rounded max-w-xs" />}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
