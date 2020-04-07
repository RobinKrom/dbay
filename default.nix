{pkgs ? import <nixpkgs> {}}:

with pkgs;
stdenv.mkDerivation {
  name = "dbay";
  buildInputs = [yarn];
}
