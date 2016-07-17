class Hash
  def self.create_hash_from_id (id)
    hash = ""
    puts id
    while(id > 0) do
      tmp = id%63
      str = get_char(tmp)
      hash = str + hash
      id = id/63
    end
    return hash
  end

  def self.create_id_from_hash(hash)
    hash_array = hash.split(//)
    hash_array_numbers = hash_array.collect { |x| get_num (x) }
    len = hash_array_numbers.length;
    i = len-1
    id = 0
    while(i >= 0) do
      id = id + hash_array_numbers[i]*(62**(len - i - 1))
      i = i - 1
    end
    return id
  end

  private
  def self.get_char(x)
    hash_char = ""
    if (x >= 1 && x <= 10)
      hash_char = (x + 47).chr
    elsif (x > 10 && x <= 36)
      hash_char = (x + 54).chr
    elsif (x > 36 && x <= 62)
      hash_char = (x + 60).chr
    end
    return hash_char
  end

  def self.get_num (char)
    val = char.ord
    if val > 47 && val < 58
      val - 47
    elsif val > 64 && val < 91
      val - 54
    elsif val > 96 && val < 123
      val - 60
    end
  end
end
