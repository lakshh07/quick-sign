"use client";
import React, { useRef, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { toast } from "sonner";
interface CanvasProps {
  width: number;
  height: number;
}

const Canvas: React.FC<CanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [penSize, setPenSize] = useState<number>(1.5);
  const [penColor, setPenColor] = useState<string>("#000000");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function startDrawing(e: MouseEvent | TouchEvent) {
      isDrawing = true;
      const pos = getDrawingPosition(e);
      [lastX, lastY] = [pos.x, pos.y];
    }

    function draw(e: MouseEvent | TouchEvent) {
      if (!isDrawing) return;
      if (!ctx) return;

      const pos = getDrawingPosition(e);
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penSize;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();

      [lastX, lastY] = [pos.x, pos.y];
    }

    function stopDrawing() {
      isDrawing = false;
    }

    function getDrawingPosition(e: MouseEvent | TouchEvent) {
      if (!canvasRef.current) {
        return { x: 0, y: 0 };
      }

      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();

      let clientX: number;
      let clientY: number;

      if (e instanceof MouseEvent) {
        clientX = e.clientX - rect.left;
        clientY = e.clientY - rect.top;
      } else if (e instanceof TouchEvent) {
        clientX = e.touches[0].clientX - rect.left;
        clientY = e.touches[0].clientY - rect.top;
      } else {
        clientX = 0;
        clientY = 0;
      }

      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      return {
        x: clientX * scaleX,
        y: clientY * scaleY,
      };
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);

    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);

      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDrawing);
    };
  }, [penColor, penSize]);

  function saveSignature() {
    toast("Signature saved", {
      description: "starting download...",
    });
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    localStorage.setItem("savedSignature", imgData);
    link.href = imgData;
    link.download = "signature.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function getRetrieveSignature() {
    clearCanvas();
    const savedSignature = localStorage.getItem("savedSignature");
    if (savedSignature) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = savedSignature;
    }
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <div className="flex flex-col justify-center items-center h-full ">
      <div className="flex gap-20  w-full items-center px-10">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="colorPicker">Pen Color</Label>
          <Input
            type="color"
            value={penColor}
            onChange={(e) => setPenColor(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="penSize">Pen Size ({penSize}px)</Label>
          <Input
            type="range"
            step={0.5}
            min={1}
            max={20}
            value={penSize}
            className={"px-0"}
            onChange={(e) => setPenSize(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="px-1.5 py-1.5 border border-gray-300 rounded-lg bg-slate-100 my-4">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className={`border max-w-full max-h-[80vh] bg-transparent rounded-lg shadow-md cursor-crosshair`}
          style={{ touchAction: "none" }}
        />
      </div>

      <div className="flex justify-between items-center gap-4">
        <Button variant="destructive" onClick={clearCanvas}>
          Clear
        </Button>
        <Button variant={"secondary"} onClick={getRetrieveSignature}>
          Retrieve Signature
        </Button>
        <Button onClick={saveSignature}>Save and Download</Button>
      </div>
    </div>
  );
};

export default Canvas;
