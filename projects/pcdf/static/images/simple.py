import cv2
import numpy as np

# ---- Load images and check info ----
img1 = cv2.imread("doctor.png")
img2 = cv2.imread("patient.png")

print("=== Image 1 (doctor.png) ===")
if img1 is not None:
    print(f"Shape: {img1.shape}")
    print(f"Dtype: {img1.dtype}")
    print(f"Channels: {img1.shape[2] if len(img1.shape) == 3 else 1}")
    print(f"Min value: {img1.min()}, Max value: {img1.max()}")
else:
    print("ERROR: Could not load doctor.png")

print("\n=== Image 2 (patient.png) ===")
if img2 is not None:
    print(f"Shape: {img2.shape}")
    print(f"Dtype: {img2.dtype}")
    print(f"Channels: {img2.shape[2] if len(img2.shape) == 3 else 1}")
    print(f"Min value: {img2.min()}, Max value: {img2.max()}")
else:
    print("ERROR: Could not load patient.png")

def convert_binary_to_white_on_transparent(img):
    """
    Convert a black binary image to:
      - white foreground (255,255,255)
      - transparent background (alpha = 0)
    """
    # Check if already grayscale
    if len(img.shape) == 2:
        gray = img
    else:
        # Ensure grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Scale up if values are 0-1 instead of 0-255
    if gray.max() <= 1:
        gray = (gray * 255).astype(np.uint8)
        print(f"  Scaled image from 0-1 to 0-255 range")

    # INVERT: Black foreground (0) becomes white (255)
    gray_inverted = cv2.bitwise_not(gray)
    print(f"  Inverted image (black becomes white)")

    # Threshold to ensure binary
    _, binary = cv2.threshold(gray_inverted, 127, 255, cv2.THRESH_BINARY)
    
    print(f"  Binary pixels > 0: {np.sum(binary > 0)} out of {binary.size}")

    # Create RGBA output
    h, w = binary.shape
    rgba = np.zeros((h, w, 4), dtype=np.uint8)

    # White where the image is white (foreground)
    rgba[binary == 255, :3] = [255, 255, 255]  # RGB white
    rgba[binary == 255, 3] = 255               # alpha = opaque

    # Transparent where image is black (background)
    rgba[binary == 0, 3] = 0  # alpha = fully transparent

    return rgba

# ---- Convert both (only if images loaded successfully) ----
if img1 is not None:
    rgba1 = convert_binary_to_white_on_transparent(img1)
    cv2.imwrite("doctor_white.png", rgba1)
    print("\n✓ doctor_white.png saved")
    print(f"  Output shape: {rgba1.shape}")

if img2 is not None:
    rgba2 = convert_binary_to_white_on_transparent(img2)
    cv2.imwrite("patient_white.png", rgba2)
    print("✓ patient_white.png saved")
    print(f"  Output shape: {rgba2.shape}")

print("\nConversion complete!")