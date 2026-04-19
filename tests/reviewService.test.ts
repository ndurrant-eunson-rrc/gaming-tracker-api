// import * as reviewService from "../src/api/v1/services/reviewService";
// import * as reviewRepository from "../src/api/v1/repositories/reviewRepository";
// import { Review } from "../src/api/v1/models/reviewModel";

// jest.mock("../src/api/v1/repositories/reviewRepository");

// const mockReview: Review = {
//   id: "review-1",
//   gameTitle: "Stardew Valley",
//   score: 9,
//   review: "One of the best games I have ever played.",
//   createdAt: new Date("2024-01-01"),
//   updatedAt: new Date("2024-01-01"),
// };

// describe("reviewService", () => {
//   beforeEach(() => jest.clearAllMocks());

//   describe("getAllReviews", () => {
//     it("should return all reviews", async () => {
//       // Arrange
//       (reviewRepository.getAllReviews as jest.Mock).mockResolvedValue({
//         docs: [{ id: mockReview.id, data: () => mockReview }],
//       });

//       // Act
//       const result = await reviewService.getAllReviews();

//       // Assert
//       expect(result).toHaveLength(1);
//       expect(result[0].score).toBe(9);
//     });

//     it("should throw ServiceError when repository fails", async () => {
//       // Arrange
//       (reviewRepository.getAllReviews as jest.Mock).mockRejectedValue(new Error("DB error"));

//       // Act & Assert
//       await expect(reviewService.getAllReviews()).rejects.toThrow("Failed to retrieve reviews");
//     });
//   });

//   describe("getReviewById", () => {
//     it("should return a review when it exists", async () => {
//       // Arrange
//       (reviewRepository.getReviewById as jest.Mock).mockResolvedValue({
//         id: mockReview.id,
//         data: () => mockReview,
//       });

//       // Act
//       const result = await reviewService.getReviewById("review-1");

//       // Assert
//       expect(result.id).toBe("review-1");
//       expect(result.gameTitle).toBe("Stardew Valley");
//     });

//     it("should throw ServiceError when review does not exist", async () => {
//       // Arrange
//       (reviewRepository.getReviewById as jest.Mock).mockResolvedValue(null);

//       // Act & Assert
//       await expect(reviewService.getReviewById("bad-id")).rejects.toThrow("Review not found");
//     });
//   });

//   describe("createReview", () => {
//     it("should create a review and return its ID", async () => {
//       // Arrange
//       (reviewRepository.createReview as jest.Mock).mockResolvedValue("new-review-id");

//       // Act
//       const result = await reviewService.createReview({
//         gameTitle: "Stardew Valley",
//         score: 9,
//         review: "Amazing game.",
//       });

//       // Assert
//       expect(result).toBe("new-review-id");
//       expect(reviewRepository.createReview).toHaveBeenCalledWith(
//         expect.objectContaining({ gameTitle: "Stardew Valley", score: 9 })
//       );
//     });
//   });

//   describe("updateReview", () => {
//     it("should update a review successfully", async () => {
//       // Arrange
//       (reviewRepository.getReviewById as jest.Mock)
//         .mockResolvedValueOnce({ id: mockReview.id, data: () => mockReview })
//         .mockResolvedValueOnce({ id: mockReview.id, data: () => mockReview });
//       (reviewRepository.updateReview as jest.Mock).mockResolvedValue(undefined);

//       // Act & Assert
//       await expect(
//         reviewService.updateReview("review-1", { score: 10 })
//       ).resolves.not.toThrow();
//     });

//     it("should throw when review does not exist", async () => {
//       // Arrange
//       (reviewRepository.getReviewById as jest.Mock).mockResolvedValue(null);

//       // Act & Assert
//       await expect(reviewService.updateReview("bad-id", {})).rejects.toThrow("Review not found");
//     });
//   });

//   describe("deleteReview", () => {
//     it("should delete a review successfully", async () => {
//       // Arrange
//       (reviewRepository.getReviewById as jest.Mock).mockResolvedValue({
//         id: mockReview.id,
//         data: () => mockReview,
//       });
//       (reviewRepository.deleteReview as jest.Mock).mockResolvedValue(undefined);

//       // Act & Assert
//       await expect(reviewService.deleteReview("review-1")).resolves.not.toThrow();
//     });

//     it("should throw when review does not exist", async () => {
//       // Arrange
//       (reviewRepository.getReviewById as jest.Mock).mockResolvedValue(null);

//       // Act & Assert
//       await expect(reviewService.deleteReview("bad-id")).rejects.toThrow("Review not found");
//     });
//   });
// });