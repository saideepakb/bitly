require 'rspec'
require_relative '../lib/tasks/hash.rb'

describe Hash do
  it 'should convert character 0 to integer 0' do
    expect(Hash.custom_atoi("0")).to eq(0)
  end

  it 'should convert character c to integer 99' do
    expect(Hash.custom_atoi("c")).to eq(38)
  end

  it 'should convert character G to integer 16' do
    expect(Hash.custom_atoi("G")).to eq(16)
  end

  it 'should increment array by 1' do
    expect(Hash.increment_hash([5,8,54])).to eq([5,8,55])
  end

  it 'should increment corner case as well' do
    expect(Hash.increment_hash([60,61,61])).to eq([61,0,0])
  end

  it 'should increment another corner case' do
    expect(Hash.increment_hash([61,61,61])).to eq([0,0,0,0])
  end

  it 'should create hash string from num array' do
    expect(Hash.create_hash_string([0,38,16])).to eq("0cG")
  end

  it 'should create hash string from num array for corner case' do
    expect(Hash.create_hash_string([61,61,61])).to eq("zzz")
  end
end
