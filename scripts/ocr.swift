import Foundation
import Vision
import AppKit

func recognizedText(from path: String) throws -> String {
  let url = URL(fileURLWithPath: path)
  guard let image = NSImage(contentsOf: url) else {
    throw NSError(domain: "ocr", code: 1, userInfo: [NSLocalizedDescriptionKey: "Unable to load image: \(path)"])
  }

  var rect = NSRect(origin: .zero, size: image.size)
  guard let cgImage = image.cgImage(forProposedRect: &rect, context: nil, hints: nil) else {
    throw NSError(domain: "ocr", code: 2, userInfo: [NSLocalizedDescriptionKey: "Unable to create CGImage: \(path)"])
  }

  let request = VNRecognizeTextRequest()
  request.recognitionLevel = .accurate
  request.usesLanguageCorrection = true

  let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
  try handler.perform([request])

  let lines = (request.results ?? []).compactMap { observation in
    observation.topCandidates(1).first?.string
  }

  return lines.joined(separator: "\n")
}

let args = Array(CommandLine.arguments.dropFirst())
if args.isEmpty {
  fputs("Usage: ocr.swift <image> [image...]\n", stderr)
  exit(1)
}

for path in args {
  do {
    let text = try recognizedText(from: path)
    print("===FILE: \(path)===")
    print(text)
  } catch {
    fputs("ERROR \(path): \(error.localizedDescription)\n", stderr)
  }
}
