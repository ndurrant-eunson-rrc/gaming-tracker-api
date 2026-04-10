import * as entryService from "../src/api/v1/services/entryService";
import * as entryRepository from "../src/api/v1/repositories/entryRepository";
import { BacklogEntry } from "../src/api/v1/models/entryModel";

jest.mock("../src/api/v1/repositories/entryRepository");

const mockEntry: BacklogEntry = {
  id: "SupeRxUniquExIDx5678",
  title: "Stardew Valley",
  genre: "Simulation",
  platform: "Steam",
  franchise: "non-franchise",
  status: "playing",
  rating: 500,
  notes: "super fun !",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

describe("entryService", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("getAllEntries", () => {
    it("should return all entries", async () => {
      // Arrange
      (entryRepository.getAllEntries as jest.Mock).mockResolvedValue({
        docs: [{ id: mockEntry.id, data: () => mockEntry }],
      });

      // Act
      const result = await entryService.getAllEntries();

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Stardew Valley");
    });

    it("should throw ServiceError when repository fails", async () => {
      // Arrange
      (entryRepository.getAllEntries as jest.Mock).mockRejectedValue(new Error("DB error"));

      // Act & Assert
      await expect(entryService.getAllEntries()).rejects.toThrow("Failed to retrieve entries");
    });
  });

  describe("getEntryById", () => {
    it("should return an entry when it exists", async () => {
      // Arrange
      (entryRepository.getEntryById as jest.Mock).mockResolvedValue({
        id: mockEntry.id,
        data: () => mockEntry,
      });

      // Act
      const result = await entryService.getEntryById("SupeRxUniquExIDx5678");

      // Assert
      expect(result.id).toBe("SupeRxUniquExIDx5678");
      expect(result.title).toBe("Stardew Valley");
    });

    it("should throw ServiceError when entry does not exist", async () => {
      // Arrange
      (entryRepository.getEntryById as jest.Mock).mockResolvedValue(null);

      // Act & Assert
      await expect(entryService.getEntryById("bad-id")).rejects.toThrow("Entry not found");
    });
  });

  describe("createEntry", () => {
    it("should create an entry and return its ID", async () => {
      // Arrange
      (entryRepository.createEntry as jest.Mock).mockResolvedValue("SupeRxUniquExIDx5678");

      // Act
      const result = await entryService.createEntry({
        title: "Stardew Valley",
        genre: "Simulation",
        platform: "Steam",
        status: "playing",
      });

      // Assert
      expect(result).toBe("SupeRxUniquExIDx5678");
      expect(entryRepository.createEntry).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Stardew Valley", status: "playing" })
      );
    });
  });

  describe("updateEntry", () => {
    it("should update an entry successfully", async () => {
      // Arrange
      (entryRepository.getEntryById as jest.Mock)
        .mockResolvedValueOnce({ id: mockEntry.id, data: () => mockEntry })
        .mockResolvedValueOnce({ id: mockEntry.id, data: () => mockEntry });
      (entryRepository.updateEntry as jest.Mock).mockResolvedValue(undefined);

      // Act & Assert
      await expect(
        entryService.updateEntry("SupeRxUniquExIDx5678", { status: "completed" })
      ).resolves.not.toThrow();
    });

    it("should throw when entry does not exist", async () => {
      // Arrange
      (entryRepository.getEntryById as jest.Mock).mockResolvedValue(null);

      // Act & Assert
      await expect(entryService.updateEntry("bad-id", {})).rejects.toThrow("Entry not found");
    });
  });

  describe("deleteEntry", () => {
    it("should delete an entry successfully", async () => {
      // Arrange
      (entryRepository.getEntryById as jest.Mock).mockResolvedValue({
        id: mockEntry.id,
        data: () => mockEntry,
      });
      (entryRepository.deleteEntry as jest.Mock).mockResolvedValue(undefined);

      // Act & Assert
      await expect(entryService.deleteEntry("SupeRxUniquExIDx5678")).resolves.not.toThrow();
    });

    it("should throw when entry does not exist", async () => {
      // Arrange
      (entryRepository.getEntryById as jest.Mock).mockResolvedValue(null);

      // Act & Assert
      await expect(entryService.deleteEntry("bad-id")).rejects.toThrow("Entry not found");
    });
  });
});