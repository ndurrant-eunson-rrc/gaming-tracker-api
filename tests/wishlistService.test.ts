// import * as wishlistService from "../src/api/v1/services/wishlistService";
// import * as wishlistRepository from "../src/api/v1/repositories/wishlistRepository";
// import { Wishlist } from "../src/api/v1/models/wishlistModel";

// jest.mock("../src/api/v1/repositories/wishlistRepository");

// const mockWishlistItem: Wishlist = {
//     id: "wishlist-1",
//     gameTitle: "Hollow Knight",
//     priority: "high",
//     notes: "On sale during summer",
//     addedAt: new Date("2024-01-01"),
//     updatedAt: new Date("2024-01-01"),
//     userId: ""
// };

// describe("wishlistService", () => {
//   beforeEach(() => jest.clearAllMocks());

//   describe("getAllWishlistItems", () => {
//     it("should return all wishlist items", async () => {
//       // Arrange
//       (wishlistRepository.getAllWishlistItems as jest.Mock).mockResolvedValue({
//         docs: [{ id: mockWishlistItem.id, data: () => mockWishlistItem }],
//       });

//       // Act
//       const result = await wishlistService.getAllWishlistItems();

//       // Assert
//       expect(result).toHaveLength(1);
//       expect(result[0].gameTitle).toBe("Hollow Knight");
//     });

//     it("should throw ServiceError when repository fails", async () => {
//       // Arrange
//       (wishlistRepository.getAllWishlistItems as jest.Mock).mockRejectedValue(new Error("DB error"));

//       // Act & Assert
//       await expect(wishlistService.getAllWishlistItems()).rejects.toThrow("Failed to retrieve wishlist items");
//     });
//   });

//   describe("getWishlistItemById", () => {
//     it("should return a wishlist item when it exists", async () => {
//       // Arrange
//       (wishlistRepository.getWishlistItemById as jest.Mock).mockResolvedValue({
//         id: mockWishlistItem.id,
//         data: () => mockWishlistItem,
//       });

//       // Act
//       const result = await wishlistService.getWishlistItemById("wishlist-1");

//       // Assert
//       expect(result.id).toBe("wishlist-1");
//       expect(result.gameTitle).toBe("Hollow Knight");
//     });

//     it("should throw ServiceError when wishlist item does not exist", async () => {
//       // Arrange
//       (wishlistRepository.getWishlistItemById as jest.Mock).mockResolvedValue(null);

//       // Act & Assert
//       await expect(wishlistService.getWishlistItemById("bad-id")).rejects.toThrow("Wishlist item not found");
//     });
//   });

//   describe("createWishlistItem", () => {
//     it("should create a wishlist item and return its ID", async () => {
//       // Arrange
//       (wishlistRepository.createWishlistItem as jest.Mock).mockResolvedValue("new-wishlist-id");

//       // Act
//       const result = await wishlistService.createWishlistItem({
//         gameTitle: "Hollow Knight",
//         priority: "high",
//       });

//       // Assert
//       expect(result).toBe("new-wishlist-id");
//       expect(wishlistRepository.createWishlistItem).toHaveBeenCalledWith(
//         expect.objectContaining({ gameTitle: "Hollow Knight", priority: "high" })
//       );
//     });
//   });

//   describe("updateWishlistItem", () => {
//     it("should update a wishlist item successfully", async () => {
//       // Arrange
//       (wishlistRepository.getWishlistItemById as jest.Mock)
//         .mockResolvedValueOnce({ id: mockWishlistItem.id, data: () => mockWishlistItem })
//         .mockResolvedValueOnce({ id: mockWishlistItem.id, data: () => mockWishlistItem });
//       (wishlistRepository.updateWishlistItem as jest.Mock).mockResolvedValue(undefined);

//       // Act & Assert
//       await expect(
//         wishlistService.updateWishlistItem("wishlist-1", { priority: "low" })
//       ).resolves.not.toThrow();
//     });

//     it("should throw when wishlist item does not exist", async () => {
//       // Arrange
//       (wishlistRepository.getWishlistItemById as jest.Mock).mockResolvedValue(null);

//       // Act & Assert
//       await expect(wishlistService.updateWishlistItem("bad-id", {})).rejects.toThrow("Wishlist item not found");
//     });
//   });

//   describe("deleteWishlistItem", () => {
//     it("should delete a wishlist item successfully", async () => {
//       // Arrange
//       (wishlistRepository.getWishlistItemById as jest.Mock).mockResolvedValue({
//         id: mockWishlistItem.id,
//         data: () => mockWishlistItem,
//       });
//       (wishlistRepository.deleteWishlistItem as jest.Mock).mockResolvedValue(undefined);

//       // Act & Assert
//       await expect(wishlistService.deleteWishlistItem("wishlist-1")).resolves.not.toThrow();
//     });

//     it("should throw when wishlist item does not exist", async () => {
//       // Arrange
//       (wishlistRepository.getWishlistItemById as jest.Mock).mockResolvedValue(null);

//       // Act & Assert
//       await expect(wishlistService.deleteWishlistItem("bad-id")).rejects.toThrow("Wishlist item not found");
//     });
//   });
// });