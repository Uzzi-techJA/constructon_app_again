import React, { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";

export default function ConstructionApp() {
  const [material, setMaterial] = useState("");
  const [volume, setVolume] = useState("");
  const [description, setDescription] = useState("");
  const [driver, setDriver] = useState("");
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
        description,
        driver,
        startTime,
        endTime,
        duration: startTime && endTime ? ((endTime - startTime) / 60000).toFixed(2) + " min" : null,
        ticketImage: ticketImage ? URL.createObjectURL(ticketImage) : null,
      };
      setEntries([newEntry, ...entries]);
      setMaterial("");
      setVolume("");
      setDescription("");
      setDriver("");
      setStartTime(null);
      setEndTime(null);
      setTicketImage(null);
    }
  };

  const handleStart = () => setStartTime(new Date());
  const handleStop = () => setEndTime(new Date());

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Construction Log Entry</h1>

      <div className="space-y-4">
        <div>
          <Label>Material Type</Label>
          <Input
            placeholder="e.g., Asphalt, Concrete"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
        </div>

        <div>
          <Label>Volume (m³ or yd³)</Label>
          <Input
            placeholder="e.g., 5.5"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>

        <div>
          <Label>Driver Name</Label>
          <Input
            placeholder="e.g., John Doe"
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleStart}>Start</Button>
          <Button onClick={handleStop}>Stop</Button>
        </div>

        <div>
          <Label>Upload Ticket Image</Label>
          <Input type="file" accept="image/*" onChange={(e) => setTicketImage(e.target.files[0])} />
        </div>

        <div>
          <Label>Description / Notes</Label>
          <Textarea
            placeholder="Any additional info..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Button onClick={handleAddEntry}>Add Entry</Button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Logged Entries</h2>
        <div className="space-y-2">
          {entries.map((entry) => (
            <Card key={entry.id}>
              <CardContent className="p-4 space-y-1">
                <p><strong>Material:</strong> {entry.material}</p>
                <p><strong>Volume:</strong> {entry.volume}</p>
                {entry.driver && <p><strong>Driver:</strong> {entry.driver}</p>}
                {entry.duration && <p><strong>Operation Time:</strong> {entry.duration}</p>}
                {entry.description && <p><strong>Notes:</strong> {entry.description}</p>}
                {entry.ticketImage && (
                  <div>
                    <strong>Ticket Image:</strong><br />
                    <img src={entry.ticketImage} alt="Ticket" className="w-full max-w-xs mt-2 rounded" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
