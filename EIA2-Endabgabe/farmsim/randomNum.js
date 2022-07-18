/// Kurze Implementierung des Zufallsgenerators
///
/// Die Implementierung von JavaScript hat keine Unterscheidung zwischen integralen und schwimmenden Zahlen -> Bitmaske nach jeder Operation.
function Xor128(){
	this.x = 123456789;
	this.y = 362436069;
	this.z = 521288629;
	this.w = 88675123;
}

Xor128.prototype.nexti = function(){
// Es muss Bitmask und logische Verschiebungen geben, um das Verhalten von 32 -Bit -Unsigned Integer zu simulieren.
	var t = ((this.x ^ (this.x << 11)) & 0xffffffff) >>> 0;
//	document.write("(t=" + t + ")");
	this.x = this.y;
	this.y = this.z;
	this.z = this.w;
	return this.w = ((this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8)) >>> 0) & 0xffffffff) >>> 0;
}

Xor128.prototype.next = function(){
	return this.nexti() / (0xffffffff >>> 0);
}
