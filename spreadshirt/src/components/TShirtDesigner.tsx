"use client"

import { useState, useRef, ChangeEvent } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Slider } from "./ui/slider"
import { SketchPicker } from "react-color"
import { Input } from "./ui/input"
import { Save, Upload, Undo, Redo, Type, Image as ImageIcon, Maximize } from "lucide-react"
import { API } from "@/lib/api"

// T-shirt colors
const TSHIRT_COLORS = [
  { name: "Sand", value: "#d2c0ae" },
  { name: "White", value: "#ffffff" },
  { name: "Light Grey", value: "#cccccc" },
  { name: "Dark Grey", value: "#666666" },
  { name: "Light Black", value: "#444444" },
  { name: "Black", value: "#000000" },
  { name: "Navy", value: "#003366" },
  { name: "Royal Blue", value: "#1e3f9e" },
  { name: "Sky Blue", value: "#6699cc" },
  { name: "Blue", value: "#336699" },
  { name: "Green", value: "#009966" },
  { name: "Dark Green", value: "#006633" },
  { name: "Maroon", value: "#990033" },
  { name: "Red", value: "#ff0000" },
  { name: "Pink", value: "#ffcccc" },
  { name: "Orange", value: "#ff9933" },
  { name: "Yellow", value: "#ffff00" },
]

// T-shirt views
const TSHIRT_VIEWS = [
  { id: "front", name: "Front" },
  { id: "back", name: "Back" },
  { id: "right", name: "Right" },
  { id: "left", name: "Left" },
]

export function TShirtDesigner() {
  // State for the canvas and design
  const [tshirtColor, setTshirtColor] = useState(TSHIRT_COLORS[0].value)
  const [currentView, setCurrentView] = useState(TSHIRT_VIEWS[0].id)
  const [canvasSize] = useState({ width: 500, height: 600 })

  // Text input states
  const [textInput, setTextInput] = useState("")
  const [textColor, setTextColor] = useState("#000000")
  const [fontSize, setFontSize] = useState(24)

  // Design elements (simplified for static builds)
  const [designText, setDesignText] = useState("")
  const [designImage, setDesignImage] = useState<string | null>(null)

  // Add text to design
  const addTextToDesign = () => {
    if (!textInput.trim()) return
    setDesignText(textInput)
    setTextInput("")
  }

  // Handle file upload
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      if (!e.target?.result) return
      setDesignImage(e.target.result.toString())
    }

    reader.readAsDataURL(file)
  }

  const handleSaveDesign = async () => {
    try {
      const design = {
        tshirtColor,
        designText,
        designImage,
        fontSize,
        textColor,
        currentView
      };
      
      const result = await API.saveDesign(design);
      alert('Design saved successfully!');
    } catch (error) {
      console.error('Error saving design:', error);
      alert('Failed to save design');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Left sidebar - Design controls */}
      <div className="w-full md:w-[200px] space-y-4">
        <Card>
          <CardContent className="p-4 space-y-2">
            <h3 className="text-sm font-semibold">Tools</h3>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="justify-start"
                onClick={() => {}}
              >
                <ImageIcon className="h-4 w-4 mr-2" aria-hidden="true" /> Products
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                  >
                    <Type className="h-4 w-4 mr-2" aria-hidden="true" /> Text
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Text</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Enter your text"
                    />
                    <div>
                      <label className="text-sm font-medium">Text Color</label>
                      <SketchPicker
                        color={textColor}
                        onChange={(color) => setTextColor(color.hex)}
                        disableAlpha
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Font Size: {fontSize}px</label>
                      <Slider
                        value={[fontSize]}
                        min={8}
                        max={72}
                        step={1}
                        onValueChange={(val) => setFontSize(val[0])}
                      />
                    </div>
                    <Button onClick={addTextToDesign}>Add Text</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <div>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start w-full"
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" aria-hidden="true" /> Upload
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <h3 className="text-sm font-semibold">History</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Undo className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button variant="outline" size="icon">
                <Redo className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Center - T-shirt canvas */}
      <div className="flex-1 flex flex-col items-center">
        <div className="relative">
          <div className="flex justify-end mb-2">
            <Button variant="outline" size="sm">
              <Maximize className="h-4 w-4 mr-2" aria-hidden="true" /> Full screen
            </Button>
          </div>

          <div
            className="relative"
            style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}
          >
            <div
              className="relative"
              style={{
                width: `${canvasSize.width}px`,
                height: `${canvasSize.height}px`
              }}
            >
              {/* T-shirt background image */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundColor: tshirtColor,
                  maskImage: 'url(/tshirt-template.png)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: 'url(/tshirt-template.png)',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
              ></div>

              {/* Design Elements (Simplified) */}
              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <div className="relative max-w-[60%] max-h-[60%] flex flex-col items-center">
                  {designText && (
                    <div
                      style={{
                        color: textColor,
                        fontSize: `${fontSize}px`,
                        fontFamily: 'Arial, sans-serif',
                        textAlign: 'center',
                        marginBottom: designImage ? '16px' : '0',
                      }}
                    >
                      {designText}
                    </div>
                  )}

                  {designImage && (
                    <img
                      src={designImage}
                      alt="Design Image"
                      style={{ maxWidth: '100%', maxHeight: '300px' }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Tabs for different views */}
            <div className="flex justify-center mt-4">
              <div className="grid grid-cols-4 gap-2">
                {TSHIRT_VIEWS.map((view) => (
                  <button
                    key={view.id}
                    className={`p-2 text-xs ${
                      view.id === currentView
                        ? "border-b-2 border-black font-medium"
                        : ""
                    }`}
                    onClick={() => setCurrentView(view.id)}
                  >
                    {view.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right sidebar - Product details */}
      <div className="w-full md:w-[300px]">
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="text-xl font-semibold">Men's T-Shirt</h2>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-400">★</span>
              ))}
              <span className="text-sm text-gray-500 ml-1">(1809)</span>
            </div>

            <div>
              <h3 className="font-medium mb-2">Product color:</h3>
              <div className="grid grid-cols-5 gap-2">
                {TSHIRT_COLORS.map((color) => (
                  <button
                    key={color.value}
                    className={`w-8 h-8 rounded-full ${
                      tshirtColor === color.value
                        ? "ring-2 ring-offset-2 ring-black"
                        : ""
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setTshirtColor(color.value)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <Button
              onClick={handleSaveDesign}
              className="w-full bg-[#23b9a6] hover:bg-[#1a8c7e]"
            >
              Save Design
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
