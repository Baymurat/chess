import bishopBlack from "../../../assets/chess_pieces/bishop_black.png";
import bishopWhite from "../../../assets/chess_pieces/bishop_white.png";
import kingBlack from "../../../assets/chess_pieces/king_black.png";
import kingWhite from "../../../assets/chess_pieces/king_white.png";
import knightBlack from "../../../assets/chess_pieces/knight_black.png";
import knightWhite from "../../../assets/chess_pieces/knight_white.png";
import pawnBlack from "../../../assets/chess_pieces/pawn_black.png";
import pawnWhite from "../../../assets/chess_pieces/pawn_white.png";
import queenBlack from "../../../assets/chess_pieces/queen_black.png";
import queenWhite from "../../../assets/chess_pieces/queen_white.png";
import rookBlack from "../../../assets/chess_pieces/rook_black.png";
import rookWhite from "../../../assets/chess_pieces/rook_white.png";

export const getPiece = (name: string) => {

  switch(name.toLowerCase()) {
    case "pawn_black": {
      return pawnBlack;
    }
    case "rook_black": {
      return rookBlack;
    }
    case "knight_black": {
      return knightBlack;
    }
    case "bishop_black": {
      return bishopBlack;
    }
    case "king_black": {
      return kingBlack;
    }
    case "queen_black": {
      return queenBlack;
    }
    case "pawn_white": {
      return pawnWhite;
    }
    case "rook_white": {
      return rookWhite;
    }
    case "knight_white": {
      return knightWhite;
    }
    case "bishop_white": {
      return bishopWhite;
    }
    case "king_white": {
      return kingWhite;
    }
    case "queen_white": {
      return queenWhite;
    }

    default: return "";
  }
};