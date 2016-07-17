class Hash
  def self.create_new_hash (str) ##Str should be the last hash added from the db
    prev_hash_array = str.split(//)
    prev_hash_array_numbers = prev_hash_array.collect { |x| custom_atoi (x) }
    curr_hash_arr_num = increment_hash(prev_hash_array_numbers)
    create_hash_string(curr_hash_arr_num)
  end

  def self.custom_atoi (char)
    val = char.ord
    if val > 47 && val < 58
      val - 48
    elsif val > 64 && val < 91
      val - 65 + 10
    elsif val > 96 && val < 123
      val - 97 + 36
    end
  end

  def self.increment_hash (hash_array)
    len = hash_array.length
    if hash_array[len-1] > 60
      j = len - 1
      while hash_array[j] > 60
        if j == 0
          mod_hash_array = []
          (len+1).times { mod_hash_array.push(0) }
          return mod_hash_array
        end
        hash_array[j] = 0
        j -= 1
      end
      hash_array[j] += 1
    else
      hash_array[len - 1] += 1
    end
    hash_array
  end

  def self.create_hash_id(hash_string)
    hash_array = str.split(//)
    hash_array_numbers = hash_array.collect { |x| custom_atoi (x) }
    i = hash_array.length
  end

  def self.create_hash_string(hash_array)
    hash_string = ""
    hash_array.each do |x|
      if (x >= 0 && x <= 9)
        hash_string += (x + 48).chr
      elsif (x > 9 && x <= 35)
        hash_string += (x + 55).chr
      elsif (x > 35 && x <= 61)
        hash_string += (x + 61).chr
      end
    end
    hash_string
  end
end
